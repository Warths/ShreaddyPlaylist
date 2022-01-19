export default class PubSubClient {
    /**
     * PubSubClient Abstraction Constructor
     * @param {str} ip             SERVER IP 
     * @param {int} ping_interval  SERVER PING INTERVAL
     */
    constructor(ip, ping_interval = 240, log=false) {
        this.ip = ip;
        this.ping_interval = ping_interval * 1000;
        this.last_ping = null
        this.queue = [];
        this.subs = [];
        this.ws = null;
        this.handlers = {};
        this.nonceHandlers = {}
        this.log = log
        setInterval(() => this.tick(), 100);

    }

    /**
     * Logic loop method
     */
    tick() {
        // INEXISTENT 
        if (this.ws == null) {
            this.init()
        }
        // DEAD 
        else if (this.ws.readyState == 3) {
            this.kill()
        }
        // CONNECTED
        else if (this.ws.readyState == 1) {
            // QUEUE HANDLING
            if (this.queue.length > 0) {
                this.handleSends()
            }
            // PING HANDLING 
            if (this.last_ping + this.ping_interval < Date.now()) {
                this.ping()
            }

        }

    }

    /**
     * Utility method for sending payloads. Handles Json encoding 
     * @param {Object} payload Payload to send to server
     */
    send(payload) {
        this.queue.push(payload);
    }

    /**
     * Initialize the PubSub Client
     */
    init() {
        this.ws = new WebSocket(this.ip);
        this.last_ping = Date.now()
        this.ws.onmessage = this.handleMessage.bind(this);

        // Resub to all topics in previous session

        for (let i of this.subs) {
            if (!this.queue.includes(i)) {
                this.queue.push(i);
            }
        }
    }

    /**
     * Kill the PubSub Client
     */
    kill() {
        this.ws = null;
        this.last_ping = null;
    }

    /**
     * PING the server
     */
    ping() {
        this.send({ "type": "PING" })
        this.last_ping = Date.now()
    }

    /**
     * Subscription method
     * @param {str} topic      Topic targeted for subscription, with modifers 
     * @param {str} auth_type  Authentication type (twitch, anonymous, app...)
     * @param {str} auth_token Authentication token
     */
    subscribe(topic, auth_type = null, auth_token = null, nonce = null) {
        let payload = {
            "type": "SUBSCRIBE",
            "topics": topic,
            "nonce": nonce
        }
        if (auth_type != null) {
            payload["authorization"] = {
                "token": auth_token,
                "type": auth_type
            }
        }
        this.send(payload)

        // Adding this payload to subs 
        this.subs.push(payload)
    }

    publish(topic, payload, auth_type = null, auth_token = null, nonce = null) {
        payload = {
            "type": "PUBLISH",
            "message": payload,
            "topic": topic,
            "nonce": null
        }

        if (auth_type != null) {
            payload["authorization"] = {
                "token": auth_token,
                "type": auth_type
            }
        }
        this.send(payload)
    }

    addHandler(topic, func) {
        console.log(topic)
        console.log(func)
        if (this.handlers[topic] == undefined) {
            this.handlers[topic] = [];
        }
        this.handlers[topic].push(func);
    }

    addNonceHandler(nonce, func) {
        if (this.nonceHandlers[nonce] == undefined) {
            this.nonceHandlers[nonce] = [];
        }
        this.nonceHandlers[nonce].push(func)
    }

    /**
     * Handle send 
     */
    handleSends() {
        while (this.queue.length > 0) {
            let data = this.queue.shift();
            if (this.log) {
                console.log("Data SEND >>");
                console.log(JSON.stringify(data, null, 2))
            }
            data = JSON.stringify(data);
            this.ws.send(data);
        }
    }

    handleMessage(event) {
        // Parsing received message

        let data = JSON.parse(event.data); 

        if (this.log) {
            console.log(data)
            console.log("Data RECV <<");
            console.log(JSON.stringify(data, null, 2))
        }


        // ANY Handlers
        if (this.handlers.any != undefined) {
            for (let func of this.handlers.any) {
                func(data)
            }
        }

        // byTopic Handlers
        if (data.topic != undefined && this.handlers[data.topic] != undefined) {
            for (let func of this.handlers[data.topic]) {
                func(data)
            }
        }

        // byNonce ephemeral Handlers
        if (data.nonce != undefined && this.nonceHandlers[data.nonce] != undefined) {
            for (let func of this.nonceHandlers[data.nonce]) {
                func(data)
            }
            delete this.nonceHandlers[data.nonce];
        }
    }
}
const respond =  (res) => {
    return {
        using(controllerFn) {
            if(!controllerFn) {
                throw new Error('Expected a callback function');
            }

            this.controllerFn = controllerFn;
        
            return this; 
        },
        async withPayload(payload)  {
            if(!this.controllerFn) {
                throw new Error('Error: Wrong usage. call responder.using(fn).withPayload(payload)');
            }

            try {
                const result =  await this.controllerFn(payload);

                if(!result.error) {
                    return res.json(result);
                }

                return res.status(400).json(result);
            } catch(e) {
                return res.status(500).json({
                    error: true,
                    message: e.message,
                });
            }
        }
    };
}

module.exports = respond;

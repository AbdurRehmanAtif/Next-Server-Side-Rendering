
const sanitizer = {

    sanitize: function(values, payload) {
        
        if (!payload || typeof payload !== 'object') {
            return {};
        }

        const sanitizedData = {};

        values.forEach(key => {
            if (payload.hasOwnProperty(key)) {
                sanitizedData[key] = payload[key];
            }
        });

        return JSON.stringify(sanitizedData);
    }
};

export default sanitizer;
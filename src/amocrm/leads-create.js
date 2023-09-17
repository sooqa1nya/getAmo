const config = require('../../config');


const leads_create = async (contact_id) => {

    const response = await fetch(`https://${config.subdomain}.amocrm.ru/api/v4/leads`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${config.access_token}`
        },
        body: JSON.stringify([{
            "_embedded": {
                "contacts": [
                    {
                        "id": contact_id
                    }
                ]
            }
        }])


    }).then(response => {

        if (!response.ok) {
            throw new Error("Ошибка отправки запроса");
        }

        return response.json();

    });


    return response;

};

module.exports = leads_create;
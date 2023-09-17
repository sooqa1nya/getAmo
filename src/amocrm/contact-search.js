const config = require('../../config');


const contact_search = async (query) => {

    const response = await fetch(`https://${config.subdomain}.amocrm.ru/api/v4/contacts?query=${query}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${config.access_token}`
        }
    }).then(response => {

        if (!response.ok) {
            throw new Error("Ошибка отправки запроса");
        }

        if (response.body === null) { // Если не найдены запрашиваемые данные возвращаем null
            return null;
        }

        return response.json();

    });


    return response;

};

module.exports = contact_search;
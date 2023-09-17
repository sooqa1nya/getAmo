const config = require('../../config');


const contact_add = async (name, phone, email) => {

    const body = [
        {
            name: name,
            custom_fields_values: [
                {
                    field_id: 2331637, // ID поля "Телефон" в вашей учетной записи AmoCRM
                    values: [
                        {
                            value: phone,
                            enum_code: "WORK" // Код элемента поля "Телефон" для типа "Рабочий" в вашей учетной записи AmoCRM
                        }
                    ]
                },
                {
                    field_id: 2331639, // ID поля "Email" в вашей учетной записи AmoCRM
                    values: [
                        {
                            value: email,
                            enum_code: "WORK" // Код элемента поля "Email" для типа "Рабочий" в вашей учетной записи AmoCRM
                        }
                    ]
                }
            ]
        }
    ];

    const response = await fetch(`https://${config.subdomain}.amocrm.ru/api/v4/contacts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.access_token}`
        },
        body: JSON.stringify(body)
    }).then(response => {

        if (!response.ok) {
            console.log(response);
            throw new Error("Ошибка отправки запроса");
        }

        return response.json();

    });


    return response;

};

module.exports = contact_add;
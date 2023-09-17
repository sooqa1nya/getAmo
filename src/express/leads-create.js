const contact_search = require('../amocrm/contact-search');
const contact_add = require('../amocrm/contact-add');
const contact_edit = require('../amocrm/contact-edit');
const leads_create = require('../amocrm/leads-create');
const express = require('express');

const PORT = 3000;

const app = express();
app.use(express.json());

app.get('/', async (req, res) => {

    const people = req.query;

    // Проверяем есть ли в полученном объекте поля name, phone, email
    if (!people.hasOwnProperty('name') || !people.hasOwnProperty('phone') || !people.hasOwnProperty('email')) {
        return res.send('Ошибка: Необходимо передать имя, телефон и почту');
    }

    const { name, phone, email } = people; // Для удобства выносим данные из объекта

    // Ищем пользователя по номеру и почте

    let search;

    for (const element of [phone, email]) {

        search = await contact_search(element);

        if (search) { // Если контакт найден, то обновляем его
            await contact_edit(search['_embedded']['contacts'][0]['id'], name, phone, email);
            break;
        }

    }

    if (!search) { // Если контакт не найден, то добавляем новый
        search = await contact_add(name, phone, email);
    }


    // Создаём сделку
    await leads_create(search['_embedded']['contacts'][0]['id']);

    res.send('Успешно: Сделка была создана');

});


app.listen(PORT, () => console.log(`Слушаем порт ${PORT}`));
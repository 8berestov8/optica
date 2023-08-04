     allowedFields: ["nickname"],

     Max Shammasov, [26.06.2023 19:45]
ssh optika_oz@45.146.167.99
Password: g3b2M8m#SZAoV*y@

Max Shammasov, [26.06.2023 19:45]
Admin panel
http://45.146.167.99:1337/admin/auth/login
Login: tsareva@zrenie-vl.ru
Password: zaFXQ5cNbr5XMEJC

Max Shammasov, [26.06.2023 19:45]
+7 (777) 888 88 88
778899

Max Shammasov, [26.06.2023 19:45]
http://45.146.167.99/

Max Shammasov, [26.06.2023 19:45]
Задача 1: Реализация пуш-уведомлений в приложении для заказа контактных линз для двух основных сценариев:

1. Когда срок ношения контактных линз истекает, например для дневных линз, отправить уведомление "Не забудьте снять линзы перед сном" в 21:00.
2. Когда у клиента заканчивается запас контактных линз и он должен сделать новый заказ за 5 дней до окончания срока.

Тип и срок ношения контактных линз определяется на основе последнего заказа клиента. В настройках приложения необходим переключатель для управления этими уведомлениями.

Примеры сценариев:

Сценарий 1.1: 
Пользователь купил однодневные контактные линзы. В 9 часов вечера (местного времени пользователя) приложение отправляет пуш-уведомление: "Не забудьте снять линзы перед сном".

Сценарий 1.2:
Пользователь носит линзы, которые действительны в течение месяца. Приложение, зная дату покупки линз, отправляет пуш-уведомление на 30-й день, например: "Ваш срок ношения линз подходит к концу, не забудьте заменить их".

Сценарий 2.1:
Пользователь заказал упаковку однодневных линз на 30 дней. На 25-й день использования приложение отправляет пуш-уведомление: "У вас осталось только 5 пар линз. Пора заказать новые!"

Сценарий 2.2:
Пользователь заказал 6-месячный запас месячных линз. Приложение, зная дату последнего заказа и количество линз в запасе, отправляет пуш-уведомление за 5 дней до окончания запаса: "Ваши линзы скоро закончатся. Не забудьте заказать новые!"



# 🚀 Getting started with Strapi

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html) (CLI) which lets you scaffold and manage your project in seconds.

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-develop)

```
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-build)

```
npm run build
# or
yarn build
```

## ⚙️ Deployment

Strapi gives you many possible deployment options for your project. Find the one that suits you on the [deployment section of the documentation](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/deployment.html).

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://docs.strapi.io) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>

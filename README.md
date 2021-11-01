# Проект Место.

Третья проектная работа на курсе Веб-разработчик плюс.

## Функционал:
1. При переходе на сайт загружаются первые 6 карточек из массива посредством JS. До загрузки они отсутствуют в разметке html
2. Есть возможность загружать новые карточки вручную с помощью формы добавления нового места, которая находится в модальном окне открывающемся по клике на большой плюс. 
3. На странице можно изменить имя профиля и описание профиля в форме редактирования профиля, которая находится в модальном окне открывающемся по клику на карандашик.
4. На карточках реализованы лайки, которые активируются при нажатии, прибавляются и убавляются при повторном нажатии.
5. При наведении на карточку на ней появляется иконка удаления карточки. При нажатии на эту иконку удаляется карточка на которой находилась эта иконка.
6. При клике на изображение в карточке оно открывается в увеличенном формате в модальном окне.
7. Открытие всех модальных окон реализовано плавно, через CSS селектор visibility.
8. Сохранение данных из форм реализовано посредством отправки форм, страница при этом не перезагружается.
9. После редактирования профиля введенные данные сохраняются в соответствующих полях формы.
10. Возможность редактирования аватара.
11. Подтверждение удаления карточек.

Адаптация под мобильные устройства была сделана с учетом точек 1280px, 320px.

## Технологии примененные в работе:
![html](https://user-images.githubusercontent.com/83250260/128259124-e415e17f-43b8-47e2-bafb-c83fe8e5f560.png)
![css](https://user-images.githubusercontent.com/83250260/128259123-b7e7f1dc-c266-410b-99d9-de6d69d78b24.png)
![js](https://user-images.githubusercontent.com/83250260/128259125-7f728f8d-2d15-425c-a1f8-918690d03aca.png)


### 🖖 А вот тут можно "пощупать" что получилось:

https://slam-cheg.github.io/mesto-project/

### Планы по доработке:
* Выложить сайт на сервер яндекс практикума в общий доступ
* Настройка webpack

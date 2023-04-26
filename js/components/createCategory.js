import { createElement } from "../helper/createElement.js";
import { declOfNum } from "../helper/declOfNum.js";

export const createCategory = (app) => {

    const category = createElement('section', {
        className: 'category section-offset',
    })
    const container = createElement('div', {
        className: 'container',
    });
    category.append(container);

    const categoryList = createElement('ul', {
        className: 'category__list',
    });
    container.append(categoryList);

    const createCategoryCard = (data) => {
        const item = createElement('li', {
            className: 'category__item',
        });
        item.dataset.id =  data.id;

        const categoryBtn = createElement('button', {
            className: 'category__card',
        });
        const categorySpanTitle = createElement('span', {
            className: 'category__title',
            textContent: data.title,
        });
        const categorySpanPairs = createElement('span', {
            className: 'category__pairs',
            textContent: declOfNum(data.length, ['пара', 'пары', 'пар']),
        });

        categoryBtn.append(categorySpanTitle, categorySpanPairs)

        const btnEdit = createElement('button', {
            className: 'category__btn category__edit',
            ariaLabel: 'Редактировать',
        });
        const btnDelete = createElement('button', {
            className: 'category__btn category__del',
            ariaLabel: 'Удалить',
        });


        item.append(categoryBtn, btnEdit, btnDelete);

            return item;
    }
    

const mount = (data) => {
    categoryList.textContent = '';
    const cards = data.map(createCategoryCard);
    categoryList.append(...cards);
    app.append(category);
    }
    const unmount = () => {
        category.remove();

    }
return { mount, unmount, categoryList }


    }
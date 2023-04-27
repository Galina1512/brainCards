import { createElement } from "../helper/createElement.js";

const TITLE = 'введите название категории';

export const createEditCategory = (app) =>{

    const editCategory = createElement('section', {
        className: 'edit section-offset',
    });

    const container = createElement('div', {
        className: 'container edit__container',
    });
    const title = createElement ('h2', {
        className: 'edit__title',
        contentEditable: true,
        title: 'Можно редактировать',
    });

    const table = createElement('table', {
        className: 'edit__table table',

    });
    const thead = createElement('thead');
    const trThead = createElement('tr');

    const tableHeadCellMain = createElement('th', {
        className: 'table__cell',
        textContent: 'main',
    });
    const tableHeadCellSecond = createElement('th', {
        className: 'table__cell',
        textContent: 'second',
    });
    const tableHeadCellEmpty = createElement('th', {
        className: 'table__cell',
    });

    const tbody = createElement('tbody');

    const btnWrapper = createElement('div', {
        className: 'edit__btn-wrapper',
    });

    const btnAddRow = createElement('button',{
        className: 'edit__btn edit__add-row',
        textContent: 'Добавить пару',
    });

    const btnSave = createElement('button',{
        className: 'edit__btn edit__save',
        textContent: 'Сохранить категорию',
    });
    const btnCancel = createElement('button',{
        className: 'edit__btn edit__cancel',
        textContent: 'Отмена',
    });

    editCategory.append(container);
    table.append(thead, tbody);
    thead.append(trThead);
    trThead.append(tableHeadCellMain, tableHeadCellSecond, tableHeadCellEmpty);
    btnWrapper.append(btnAddRow, btnSave, btnCancel);
    container.append(title, table, btnWrapper);


    const createTRCell = (dataArr)=> {
        const tr = createElement('tr');
        const tableCellOne = createElement('th', {
            className: 'table__cell table__cell_one',
            textContent: dataArr[0],
            contentEditable: true,
        });
        const tableCellSecond = createElement('th', {
            className: 'table__cell table__cell_two',
            textContent: dataArr[1],
            contentEditable: true,
        });
        const tableCellDel = createElement('th', {
            className: 'table__cell',
        });
        const delRow = createElement('button', {
            className: 'table__dell',
            textContent: 'x',
        });


        delRow.addEventListener('click', ()=> {
        if (confirm('Вы уветены, что хотите удалить строку?')) {
                tr.remove();
                }
        });

        tableCellDel.append(delRow);
        tr.append(tableCellOne, tableCellSecond, tableCellDel);

        return tr;

    };



    const clearTitile = () => {
        if(title.textContent === TITLE) {
            title.textContent = '';
        }
    };
    const checkTitile = () => {
        if (title.textContent === '') {
            title.textContent = TITLE
        }
    };

    title.addEventListener('focus', clearTitile);
    title.addEventListener('blur', checkTitile);

    btnAddRow.addEventListener('click', () => {
        const emptyRow = createTRCell(['', '']);
        tbody.append(emptyRow);

    });


    const mount = (data = { title: TITLE, pairs: [] }) => {

        tbody.textContent = '';
        title.textContent = data.title;

        if (title.textContent === TITLE) {
            title.classList.add('edit__title_change');
        } else {
            title.classList.remove('edit__title_change');
        }

        const rows = data.pairs.map(createTRCell);
        const emptyRow = createTRCell(['', '']);
        tbody.append(...rows, emptyRow);

        app.append(editCategory);
    };

    const unmount = () => {
        editCategory.remove();
    };

    return { mount, unmount }
};
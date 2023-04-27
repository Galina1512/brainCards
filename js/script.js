import { createCategory } from "./components/createCategory.js";
import { createEditCategory } from "./components/createEditCategory.js";
import { createHeader } from "./components/createHeader.js";
import { createPairs } from "./components/createPairs.js";
import { createElement } from "./helper/createElement.js";
import { fetchCategories, fetchCards } from "./service/api.service.js";

const initApp = async () => {
    
    const headerParent = document.querySelector('.header');
    const app = document.querySelector('#app');
    
    const headerObj = createHeader(headerParent);
    const categoryObj = createCategory(app);
    const editCategoryObj = createEditCategory(app);
    const pairsObj = createPairs(app);

    const allSectionUnmount = () =>{
        [categoryObj, editCategoryObj, pairsObj].forEach(obj => obj.unmount());
        // categoryObj.unmount();
        // editCategoryObj.unmount();

    }


    const renderIndex = async e =>{
        e?.preventDefault();
        allSectionUnmount();
        headerObj.updateHeaderTitle('Категории');
        const categories = await fetchCategories();
        if (categories.error) {
            app.append(createElement('p', {
                className: 'server-error',
                textContent:  'Ошибка сервера',
            }))
            return;
        }
        categoryObj.mount(categories);
    };
    renderIndex();
    
        headerObj.headerLogoLink.addEventListener('click', renderIndex);
        
        headerObj.headerBtn.addEventListener('click', () => {
            allSectionUnmount();   
            headerObj.updateHeaderTitle('Новая категория');
            editCategoryObj.mount();
        });

    categoryObj.categoryList.addEventListener('click', async ({ target }) => {
        const categoryItem = target.closest('.category__item');
        

        if (target.closest('.category__edit')) {
            const dataCards = await fetchCards(categoryItem.dataset.id);
            allSectionUnmount();
            headerObj.updateHeaderTitle('Редактирование');
            editCategoryObj.mount(dataCards);
            return;
            }

            if (target.closest('.category__del')) {
                console.log('Delete');
                return;
            }

            if(categoryItem) {
                const dataCards = await fetchCards(categoryItem.dataset.id);
                allSectionUnmount();
                headerObj.updateHeaderTitle(dataCards.title);
                // shuffle();
                pairsObj.mount(dataCards);
            }
    });

        pairsObj.buttonReturn.addEventListener('click', renderIndex);    
};
initApp();
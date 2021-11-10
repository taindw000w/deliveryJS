const menu = () => {
    const cardsMenu = document.querySelector('.cards-menu');

    const changeTitle = (restaurant) => {
        const nameTitle = document.querySelector('.restaurant-title');
        nameTitle.textContent = restaurant.name;

        const starsTitle = document.querySelector('.rating');
        starsTitle.textContent = restaurant.stars;

        const priceTitle = document.querySelector('.price');
        priceTitle.textContent = restaurant.price;
    }
    const cardArray = [];

    const addToCard = (objItem) => {
        cardArray.push(objItem)
        localStorage.setItem('cart', JSON.stringify(cardArray));
    }

    const renderItems = (data) => {
        data.forEach(({image, kitchen, id, name, description, price, products, stars, time_of_delivery } ) => {
            
            const card = document.createElement('div');
            
            card.classList.add('card');
        
            card.innerHTML = `
                <img src='${image}' alt='${name}' class="card-image" />
                <div class="card-text">
                    <div class="card-heading">
                        <h3 class="card-title card-title-reg">${name} </h3>
                    </div>
                    <!-- /.card-heading -->
                    <div class="card-info">
                        <div class="ingredients">
                        ${description}
                        </div>
                    </div>
                    <!-- /.card-info -->
                    <div class="card-buttons">
                        <button class="button button-primary button-add-cart">
                            <span class="button-card-text">В корзину</span>
                            <span class="button-cart-svg"></span>
                        </button>
                        <strong class="card-price-bold">${price} ₽</strong>
                    </div>
                </div>
            `
            card.querySelector('.button-card-text').addEventListener('click', ()=> {
                addToCard({ name, price, count: 1 });
            });

            cardsMenu.append(card);
        });
    }

    if (localStorage.getItem('restaurant')) {
        const restaurant = JSON.parse(localStorage.getItem('restaurant'));

        changeTitle(restaurant);

        fetch(`/db/${restaurant.products}`)
        .then((response) => response.json())
        .then((data) => {
            renderItems(data);
        })
        .catch((err) => {
            console.log(err);
        })
    } else {
        window.location.href = '/';
    }
}

menu();
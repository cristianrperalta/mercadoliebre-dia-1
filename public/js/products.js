window.onload = function(){
    let latestProducts = document.getElementById('latest-products')
    fetch('http://localhost:3000/api/products/latest')
        .then(response => response.json())
        .then(data => {
            data.data.forEach(element => {
                let lastChild = latestProducts.lastElementChild
                let newChild = lastChild.cloneNode(true)
                let stringDiscount = ''
                if( element.discount > 0 ) {
                    stringDiscount = `<span>` + element.discount + ` % OFF</span>`
                }
                newChild.innerHTML = 
                `<section class="product-box">
                    <a href="/products/detail/`+ element.id + `">` +
                        `<figure class="product-box_image">
                            <img src="/images/products/`+ element.image + `" alt="`+ element.name + `">
                        </figure>
                        <article class="product-box_data">
                            <h2>$`+ (element.price - element.price * element.discount / 100) + `</h2>
                            `+ stringDiscount + `
                            <p>`+ element.name + `</p>
                            <i class="fas fa-truck"></i>
                        </article>
                    </a>
                </section>
                </div>`
                
                lastChild.after(newChild)
            });
        });

    let offersProducts = document.getElementById('offers-products')
    fetch('http://localhost:3000/api/products/offers')
        .then(response => response.json())
        .then(data => {
            data.data.forEach(element => {
                let lastChild = offersProducts.lastElementChild
                let newChild = lastChild.cloneNode(true)
                let stringDiscount = ''
                if( element.discount > 0 ) {
                    stringDiscount = `<span>` + element.discount + ` % OFF</span>`
                }
                newChild.innerHTML = 
                `<section class="product-box">
                    <a href="/products/detail/`+ element.id + `">` +
                        `<figure class="product-box_image">
                            <img src="/images/products/`+ element.image + `" alt="`+ element.name + `">
                        </figure>
                        <article class="product-box_data">
                            <h2>$`+ (element.price - element.price * element.discount / 100) + `</h2>
                            `+ stringDiscount + `
                            <p>`+ element.name + `</p>
                            <i class="fas fa-truck"></i>
                        </article>
                    </a>
                </section>
                </div>`
                
                lastChild.after(newChild)
            });
        });
}
let form = document.getElementById('addToCartForm')
const _productId = document.getElementById('productId')
const _quantity = document.getElementById('quantity')
const _userId = 102 //locals.user.id

form.addEventListener('submit', function(e){
    axios.post('http://localhost:3000/api/items', {
        productId: _productId.value,
        quantity: _quantity.value,
        userId: _userId
    })
    .then(json => {
        console.log(json)
    })
    .catch(function (error) {
        // handle error
        console.log(error)
    }); 
})
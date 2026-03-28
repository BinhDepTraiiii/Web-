const addBtn = document.getElementById('add-product'); // lấy phần tử nút Thêm sản phẩm
const productListEl = document.getElementById('productList'); 
addBtn.addEventListener('click' , function () {
    const Name = document.getElementById('product-name').value; 
    const Codeproduct = document.getElementById('product-code').value;
    const Price = document.getElementById('price').value;
    const Quanity = document.getElementById('quantity').value;
    // Kiểm tra điền đủ thông tin 
    if ( Name === '' || Codeproduct === '' || Price === '' || Quanity === '') {
        alert ("Bạn không được để trống ");
        return;
    }
    if (isNaN(Price) || Number(Price) <= 0) {
        alert("Giá phải là số dương ");
        return;
    }
    if ( isNaN(Quanity) || Number(Quanity) <= 0 ) {
        alert("Số lượng phải là số dương ");
        return;
    }
    product.push({
        name: Name,
        code: Codeproduct,
        price: Price,
        quantity: Quanity
    });
    saveProduct();
    renderProduct();
    clearForm();
});

productListEl.addEventListener('click', function (event) {
    const btn = event.target.closest('.delete-btn');
    if (!btn) return;

    const index = Number(btn.dataset.index);
    if (isNaN(index)) return;

    product.splice(index, 1);
    saveProduct();
    renderProduct();
});

renderProduct();
// Lưu dữ liệu sản phẩm vào localStorage
let product = JSON.parse(localStorage.getItem('product')) || [];
function saveProduct() {
    localStorage.setItem('product', JSON.stringify(product));
}
// Hàm xóa dữ liệu sau khi nhập 
function clearForm() {
    document.getElementById('product-name').value = '';
    document.getElementById('product-code').value = '';
    document.getElementById('price').value = '';
    document.getElementById('quantity').value = '';
}
function renderProduct() {
    const productListEl = document.getElementById('productList');
    productListEl.innerHTML = '';
    product.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.code}</td>
        <td>${item.price}</td>
        <td>${item.quantity}</td>
        <td><button class="delete-btn" data-index="${index}">Xóa</button></td>`;
        productListEl.appendChild(row);
    });
}

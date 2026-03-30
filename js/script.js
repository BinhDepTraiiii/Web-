const addBtn = document.getElementById('add-product'); // lấy phần tử nút Thêm sản phẩm
const productListEl = document.getElementById('productList'); 
const searchInput= document.getElementById('search');
let product = JSON.parse(localStorage.getItem('product')) || [];
addBtn.addEventListener('click' , function () {
    const Name = document.getElementById('product-name').value; 
    const Codeproduct = document.getElementById('product-code').value;
    const Price = document.getElementById('price').value;
    const Quantity = document.getElementById('quantity').value;
    // Kiểm tra điền đủ thông tin 
    if ( Name === '' || Codeproduct === '' || Price === '' || Quantity === '') {
        alert ("Bạn không được để trống ");
        return;
    }
    if (isNaN(Price) || Number(Price) <= 0) {
        alert("Giá phải là số dương ");
        return;
    }
    if ( isNaN(Quantity) || Number(Quantity) <= 0 ) {
        alert("Số lượng phải là số và lớn hơn 0 ");
        return;
    }
    product.push({
        name: Name,
        code: Codeproduct,
        price: Price,
        quantity: Quantity
    });
    sortProducts();
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
setupSearch();
// Lưu dữ liệu sản phẩm vào localStorage
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
function sortProducts() {
    product.sort((a, b) => 
    {
        const aNum = Number(a.code);
        const bNum = Number(b.code);
        if (!isNaN(aNum) && !isNaN(bNum)) {
            return aNum - bNum; // Sắp xếp theo số nếu cả hai đều là số
        }
    });
}
function renderProduct() {
    sortProducts();
    const productListEl = document.getElementById('productList');
    productListEl.innerHTML = '';
    product.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.code}</td>
        <td>${item.quantity}</td>
        <td>${item.price}</td>
        <td><button class="delete-btn" data-index="${index}">Xóa</button></td>`;
        productListEl.appendChild(row);
    });
}
function setupSearch() {
    const searchBtn = document.getElementById('search-product');
    searchBtn.addEventListener('click', function () {
        const keyword = searchInput.value.toLowerCase(); // Tránh lỗi chữ hoa và chữ thường 
        const rows = document.querySelectorAll('#productList tr');
        rows.forEach(row => {
            const name = row.children[0].textContent.toLowerCase(); // Lấy tên sản phẩm và chuyển về chữ thường
            if (name.includes(keyword)) {
                row.style.display = ''; // Hiển thị hàng nếu có chứa từ khóa
            }
            else
            {
                row.style.display = 'none'; // Ẩn hàng nếu không chứa từ khóa
            }
        });
    });
}

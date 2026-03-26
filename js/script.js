const addBtn = document.getElementById('add-product'); // lấy phần tử nút Thêm sản phẩm 
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
    // Tạo dòng mới trong bảng khi thêm sản phẩm
    const newRow = document.createElement('tr');
    newRow.innerHTML = 
    `<td>${Name}</td>
    <td>${Codeproduct}</td>
    <td>${Price}</td>
    <td>${Quanity}</td>
    <td><button class="delete-btn">Xóa</button></td>`;
    // Thêm dòng mới vào bảng
    document.getElementById('productList').appendChild(newRow);
    // Xóa sản phẩm khi nhấn nút Xóa
    document.getElementById('product-name').value = '';
    document.getElementById('product-code').value = '';
    document.getElementById('price').value = '';
    document.getElementById('quantity').value = '';
});

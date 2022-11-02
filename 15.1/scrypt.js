const btn = document.querySelector('.j-btn-test');
const btnIcon = btn.querySelector('.btn_icon');
//Иконки
const icon1SVG =`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/></svg>`;

const icon2SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-left-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-5.904-2.803a.5.5 0 1 1 .707.707L6.707 10h2.768a.5.5 0 0 1 0 1H5.5a.5.5 0 0 1-.5-.5V6.525a.5.5 0 0 1 1 0v2.768l4.096-4.096z"/>
</svg>`;
//Функция - перключатель
const ChangeIcon = () =>{
    let iconClassRemove;
    let iconClassAdd;
    let svgIcon;

    if (btnIcon.classList.contains('icon1')) {
      iconClassRemove = 'icon1';
      iconClassAdd = 'icon2';
      svgIcon = icon2SVG;
    } else if (btnIcon.classList.contains('icon2')) {
      iconClassRemove = 'icon2';
      iconClassAdd = 'icon1';
      svgIcon = icon1SVG;
    }
    btnIcon.classList.remove(iconClassRemove);
    btnIcon.classList.add(iconClassAdd);
    btnIcon.innerHTML = svgIcon;
};
//Обработчик событий
btn.addEventListener('click', () => {
    ChangeIcon();
});
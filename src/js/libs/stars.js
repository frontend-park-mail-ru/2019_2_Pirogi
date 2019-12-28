export default function starsInit() {
    const starsContainer = document.getElementById('stars');
    const stars = starsContainer.querySelectorAll('i');
    const starsChange = document.querySelector('div.stars__change');
    const starsReviewContainer = document.querySelectorAll('div.stars_review');

    const init = () => {
        initStarsReview();
        starsChange.style.display = 'none';
        starsContainer.removeEventListener('mouseover', addChangeStarsMenu);
        starsContainer.removeEventListener('mouseout', removeChangeStarsMenu);
        starsContainer.removeEventListener('click', init);
        starsContainer.addEventListener('mouseleave', handleMouseleave);
        stars.forEach((item) => {
            item.classList.remove('star_chosen');
            item.classList.remove('opacity-0');
            item.addEventListener('mouseover', handleMouseover);
            item.addEventListener('click', handleClickOnStar);
        });
    };

    const initStarsReview = () => {
        starsReviewContainer.forEach((item) => {
            let starsNum = parseFloat(item.attributes['data-value'].value);
            let starsReview = item.querySelectorAll('i');
            for (let i = 0; i < starsNum; i++) {
                starsReview[i].classList.add('star_chosen');
            }
        });
    };

    const handleMouseover = (e) => {
        const chosenStar = e.currentTarget;
        const index = parseInt(chosenStar.attributes['data-index'].value);
        for (let i = 0; i < index + 1; i++) {
            stars[i].classList.add('star_active');
        }
        for (let i = index + 1; i < 5; i++) {
            stars[i].classList.remove('star_active');
        }
    };

    const addChangeStarsMenu = () => {
        stars.forEach((item) => {
            item.classList.add('opacity-0');
        });
        starsChange.style.display = 'flex';
        starsContainer.addEventListener('click', init);
    };

    const removeChangeStarsMenu = () => {
        stars.forEach((item) => {
            item.classList.remove('opacity-0');
        });
        starsChange.style.display = 'none';
        starsChange.removeEventListener('click', init);

    };

    const fixStars = () => {
        const index = parseInt(starsContainer.attributes['data-value'].value);
        for (let i = 0; i < index; i++) {
            stars[i].classList.add('star_chosen');
        }
        setTimeout(() => {
            for (let i = 0; i < index; i++) {
                stars[i].animate([
                    {opacity: 1},
                    {opacity: 0},
                ], {
                    duration: i * 100,
                });
            }
        }, 500);

    };

    const handleMouseleave = () => {
        stars.forEach((item) => {
            item.classList.remove('star_active');
        });
    };

    const handleClickOnStar = function (e) {
        const chosenStar = e.currentTarget;
        starsContainer.attributes['data-value'].value = parseInt(chosenStar.attributes['data-index'].value) + 1;
        starsContainer.removeEventListener('mouseleave', handleMouseleave);
        stars.forEach((item) => {
            item.removeEventListener('mouseover', handleMouseover);
            item.removeEventListener('click', handleClickOnStar);
        });
        fixStars();
        starsContainer.addEventListener('mouseover', addChangeStarsMenu);
        starsContainer.addEventListener('mouseout', removeChangeStarsMenu);

    };
    init();
}
	//IE Debug
	(function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        var ieV = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        document.querySelector('body').className += ' IE';
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        var ieV = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        document.querySelector('body').className += ' IE';
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
       // IE 12 (aka Edge) => return version number
       var ieV = parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        document.querySelector('body').className += ' IE';
    }

    // other browser
    return false;
})();


class menuMobFunc{
  constructor(el, option){
    this.el = el;
    this.iconMenu = this.el.querySelectorAll( '.icon-mob-js' );
    this.menu = this.el.querySelector( '.menu-site' );

    this._init();
  }
  _init(){
    var self = this;

    this.iconMenu.forEach(function(el, i){
      el.addEventListener('click', function(e) {
        e.preventDefault();
        self._startFunc();
      });
    })
  }
  _startFunc(){
    if(this.menu.classList.contains('active-menu')){
      this.menu.classList.remove('active-menu');
    }
    else{
      this.menu.classList.add('active-menu');
      // this.iconMenu.querySelector('i').classList.add('icon-menu-active');
    }
  }
}

new menuMobFunc ( document.querySelector('.header-site') );


class bannerFunc{
  constructor(el, option){
    this.el = el;
    this.option = option;

    this.itensImg = this.el.querySelectorAll('.wrap-itens .item');
    this.itensBall = this.el.querySelectorAll('.balls-control li');
    this.arrow = this.el.querySelectorAll('.arrow');

    this.maxImg = this.itensImg.length;

    this.countLoop = 1;
    
    this.debugClick = true;

    this._init();
  }
  _init(){
    var self = this;

    if(this.maxImg > 1){
      this._startLoop();

      this.itensBall.forEach(function(el, i){
        el.addEventListener('click', function(){
          self._changeBall(this.classList.value, this);
        })
      });
  
      this.arrow.forEach(function(el, i){
        el.addEventListener('click', function(){
          self._startArrow(this.className.substr(12));
        })
      })
    }
    else{
      this.el.querySelectorAll('.balls-control li').forEach((el, i)=>{
        el.classList.add('d-none');
      });
      this.el.querySelector('.arrow-control').classList.add('d-none');
    }
  }
  _startArrow(select){
    if(this.debugClick){
      this.debugClick = false;
      clearInterval(this.loop);
      let activeItem = document.querySelector('.banner-js .wrap-itens .item.active');
      let activeBall = document.querySelector('.banner-js .balls-control li.active');
  
      if(select == 'right'){
        if(this.countLoop == this.maxImg){
          this.countLoop = 1;
  
          activeItem.classList.remove('active');
          document.querySelector('.banner-js .wrap-itens .item:first-child').classList.add('active');
          activeBall.classList.remove('active');
          document.querySelector('.banner-js .balls-control li:first-child').classList.add('active');
  
          setTimeout(()=>{
            this.debugClick = true;
          }, 600);
        }
        else{
          this.countLoop++;

          activeItem.classList.remove('active');
          activeItem.nextElementSibling.classList.add('active');
          activeBall.classList.remove('active');
          activeBall.nextSibling.nextSibling.classList.add('active');
  
          //Remove efeits
          setTimeout(()=>{
            this.debugClick = true;
          }, 600);
        }
      }
      else{
        if(this.countLoop == 1){
          this.countLoop = 3;
  
          activeItem.classList.remove('active');
          document.querySelector('.banner-js .wrap-itens .item:last-child').classList.add('active');
          activeBall.classList.remove('active');
          document.querySelector('.banner-js .balls-control li:last-child').classList.add('active');

          setTimeout(()=>{
            this.debugClick = true;
          }, 600);
        }
        else{
          this.countLoop--;

          activeItem.classList.remove('active');
          activeItem.previousElementSibling.classList.add('active');
          activeBall.classList.remove('active');
          activeBall.previousElementSibling.classList.add('active');  

          setTimeout(()=>{
            this.debugClick = true;
          }, 600);
        }
      }
    }
  }
  _startLoop(){
    this.loop = setInterval(()=>{
      if(this.debugClick){
        this.debugClick = false;
        let activeItem = document.querySelector('.banner-js .wrap-itens .item.active');
        let activeBall = document.querySelector('.banner-js .balls-control li.active');

        //Verifica se está no ultimo slide e recomeça o Slideshow
        if(this.countLoop == this.maxImg){
          this.countLoop = 1;

        //Troca de Slide
          activeItem.classList.remove('active');
          document.querySelector('.banner-js .wrap-itens .item:first-child').classList.add('active');

          //Troca de Ball
          activeBall.classList.remove('active');
          document.querySelector('.banner-js .balls-control li:first-child').classList.add('active');

          setTimeout(()=>{
            this.debugClick = true;
          }, 600);
        }
        //Caso não for o último Slide passa para o próximo
        else{
          this.countLoop++;

        //Troca de Slide
          activeItem.classList.remove('active');
          activeItem.nextElementSibling.classList.add('active');
          
          //Troca de Ball
          activeBall.classList.remove('active');
          activeBall.nextSibling.nextSibling.classList.add('active');

          setTimeout(()=>{
            this.debugClick = true;
          }, 600);
        }
      }
    }, 3000)
  }
  _changeBall(itemSelect, item){
    if(this.debugClick){
      this.debugClick = false;
      let activeItem = document.querySelector('.banner-js .wrap-itens .item.active');

      if(itemSelect.indexOf('active') < 0){
        document.querySelector('.banner-js .balls-control li.active').classList.remove('active');
        activeItem.classList.remove('active');
          
        document.querySelector(`.banner-js .wrap-itens .${itemSelect}`).classList.add('active');
        item.classList.add('active');

        setTimeout(()=>{
          this.debugClick = true;
        }, 600);

        //Arruma ordem do loop para não bugar
        this.countLoop = parseInt( itemSelect.substr(5,1) );
        clearInterval(this.loop);
      }
    }
  }
}

new bannerFunc ( document.querySelector( '.banner-js' ) );
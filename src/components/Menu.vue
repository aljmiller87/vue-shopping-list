<template>
  <div class="menu menu_mm trans_300">
    <div class="menu_container menu_mm">
      <div class="page_menu_content">

        <div class="page_menu_search menu_mm">
          <form action="#">
            <input type="search" required="required" class="page_menu_search_input menu_mm" placeholder="Search for products...">
          </form>
        </div>
        <ul class="page_menu_nav menu_mm">
          <li class="page_menu_item has-children menu_mm">
            <a href="index.html">Home<i class="fa fa-angle-down"></i></a>
            <ul class="page_menu_selection menu_mm">
              <li class="page_menu_item menu_mm"><a href="categories.html">Categories<i class="fa fa-angle-down"></i></a></li>
              <li class="page_menu_item menu_mm"><a href="product.html">Product<i class="fa fa-angle-down"></i></a></li>
              <li class="page_menu_item menu_mm"><a href="cart.html">Cart<i class="fa fa-angle-down"></i></a></li>
              <li class="page_menu_item menu_mm"><a href="checkout.html">Checkout<i class="fa fa-angle-down"></i></a></li>
              <li class="page_menu_item menu_mm"><a href="contact.html">Contact<i class="fa fa-angle-down"></i></a></li>
            </ul>
          </li>
          <li class="page_menu_item has-children menu_mm">
            <a href="categories.html">Categories<i class="fa fa-angle-down"></i></a>
            <ul class="page_menu_selection menu_mm">
              <li class="page_menu_item menu_mm"><a href="categories.html">Category<i class="fa fa-angle-down"></i></a></li>
              <li class="page_menu_item menu_mm"><a href="categories.html">Category<i class="fa fa-angle-down"></i></a></li>
              <li class="page_menu_item menu_mm"><a href="categories.html">Category<i class="fa fa-angle-down"></i></a></li>
              <li class="page_menu_item menu_mm"><a href="categories.html">Category<i class="fa fa-angle-down"></i></a></li>
            </ul>
          </li>
          <li class="page_menu_item menu_mm"><a href="index.html">Accessories<i class="fa fa-angle-down"></i></a></li>
          <li class="page_menu_item menu_mm"><a href="#">Offers<i class="fa fa-angle-down"></i></a></li>
          <li class="page_menu_item menu_mm"><a href="contact.html">Contact<i class="fa fa-angle-down"></i></a></li>
        </ul>
      </div>
    </div>

    <div class="menu_close"><i class="fa fa-times" aria-hidden="true"></i></div>

    <div class="menu_social">
      <ul>
        <li><a href="#"><i class="fa fa-pinterest" aria-hidden="true"></i></a></li>
        <li><a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
        <li><a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
        <li><a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Menu",
    data() {
      return {
        hambActive: false,
        menuActive: false,
        menuIcon: undefined,
        menu: undefined,
      }
    },
    mounted() {
      this.menuIcon = document.querySelector('.hamburger');
      this.menu = document.querySelector('.menu');
      this.menuClose = document.querySelector('.menu_close');
      this.menuLinks = document.querySelectorAll('.page_menu_item');
      this.setEventListeners();
    },
    methods: {
      setEventListeners() {
        // Menu Open
        if (this.menuIcon) {
          this.menuIcon.addEventListener('click', this.toggleMenu);
        };
        // Menu Close
        if (this.menuClose) {
          this.menuClose.addEventListener('click', this.toggleMenu);
        };
        // Menu Links
        if (this.menuLinks && this.menuLinks.length > 0) {
          const links = [...this.menuLinks];
          links.forEach(link => {
            link.addEventListener('click', this.toggleMenuLink);
          });
        };
      },
      toggleMenu() {
        if (!this.menu) {
          return;
        }

        if (this.menu.classList.contains('active')) {
          this.menu.classList.remove('active');
          this.hambActive = false;
          this.menuActive = false;
        } else {
          this.menu.classList.add('active');
          this.hambActive = true;
          this.menuActive = true;
        }
      },
      toggleMenuLink(event) {
        if (this.hasChildren(event.target)) {
          event.preventDefault();
          event.stopPropagation();
          const subItem = this.findSubNav(event.target);

          if (!subItem) {
            return;
          }
          if(subItem.classList.contains('active')) {
            subItem.classList.toggle('active');
            TweenMax.to(subItem, 0.3, {height:0});
          } else {
            subItem.classList.toggle('active');
            TweenMax.set(subItem, {height:"auto"});
            TweenMax.from(subItem, 0.3, {height:0});
          }
        }

      },
      findSubNav(node) {
        return node.parentNode.querySelector('ul');
      },
      hasChildren(node) {
        if (!node) {
          return false;
        }

        if (node.classList.contains('has-children')) {
          return true;
        }

        if (node.parentNode.classList.contains('has-children')) {
          return true;
        }

        return false;
      }
      // initMenu() {
      //   if($('.hamburger').length)
      //     {
      //       var hamb = $('.hamburger');

      //       hamb.on('click', function(event)
      //       {
      //         event.stopPropagation();
      //         if(!this.menuActive)
      //         {
      //           this.openMenu;
                
      //           $(document).one('click', function cls(e)
      //           {
      //             if($(e.target).hasClass('menu_mm'))
      //             {
      //               $(document).one('click', cls);
      //             }
      //             else
      //             {
      //               this.closeMenu();
      //             }
      //           });
      //         }
      //         else
      //         {
      //           $('.menu').removeClass('active');
      //           this.menuActive = false;
      //         }
      //       });

      //       //Handle page menu
      //       // if($('.page_menu_item').length)
      //       // {
      //       //   var items = $('.page_menu_item');
      //       //   items.each(function()
      //       //   {
      //       //     var item = $(this);

      //       //     item.on('click', function(evt)
      //       //     {
      //       //       if(item.hasClass('has-children'))
      //       //       {
      //       //         evt.preventDefault();
      //       //         evt.stopPropagation();
      //       //         var subItem = item.find('> ul');
      //       //           if(subItem.hasClass('active'))
      //       //           {
      //       //             subItem.toggleClass('active');
      //       //           TweenMax.to(subItem, 0.3, {height:0});
      //       //           }
      //       //           else
      //       //           {
      //       //             subItem.toggleClass('active');
      //       //             TweenMax.set(subItem, {height:"auto"});
      //       //           TweenMax.from(subItem, 0.3, {height:0});
      //       //           }
      //       //       }
      //       //       else
      //       //       {
      //       //         evt.stopPropagation();
      //       //       }
      //       //     });
      //       //   });
      //       // }
      //     }
      // },
       
    }
  }
</script>
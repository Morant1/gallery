'use strict';

$(document).ready(initPage);

function initPage() {
  renderProject();
}

function renderProject() {
  var projects = createProjects();
  var strHtmls = projects.map(function (project) {
    return `
     <div class="col-md-4 col-sm-6 portfolio-item">
      <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1" onclick="onRenderModal(${project.id})">
        <div class="portfolio-hover">
          <div class="portfolio-hover-content">
            <i class="fa fa-plus fa-3x"></i>
          </div>
        </div>
        <img class="img-fluid" src="${project.url}" alt="">
      </a>
      <div class="portfolio-caption">
        <h4>${project.name}</h4>
      </div>
      </div>`;
  })
  $('.projects').html(strHtmls.join(''));
}

function onSubmit(){
  var body = $('#exampleFormControlTextarea1').val();
  var subject = $('#exampleFormControlSelect1').val();
  var email = $('#exampleFormControlInput1').val();
  console.log(body,subject,email);
  var str =`
  https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}
  `;
  window.open(str);
}

function onRenderModal(id) {
  var project = getProjectById(id);
  var innerHtml = `
  <h2>${project.name}</h2>
  <img class="img-fluid d-block mx-auto" src="${project.url}" alt="">
  <p>${project.desc}</p>
  <ul class="list-inline">
         <li>Date: ${project.publishedAt}</li>
         <li class="hash">${project.category[0]}</li>
         <li class="hash">${project.category[1]}</li>
  </ul>
  <button type="button" class="btn btn-primary bg-transparent"><a style="color:black;"
   href="projs/${project.id}/index.html" target="_blank">Check the project</a></button>
   <br>
  <button class="btn btn-primary mt-2" data-dismiss="modal" type="button">
  <i class="fa fa-times"></i>
  </button>
`;

 $('.modal-body').html(innerHtml);

}





(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 54)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function () {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

  // Collapse the navbar when page is scrolled
  $(window).scroll(function () {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  });

})(jQuery); // End of use strict

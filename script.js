
document.addEventListener('DOMContentLoaded', function() {
  
    // Print information to the browser console (press F12 to see it)
    console.log("Website developed by: Your Name");
    console.log("GitHub: github.com/yourusername");
    console.log("Contact: your.email@example.com");
    
    
   
    // hamburger button, navigation menu, and all navigation links
    var burgerButton = document.querySelector('.burger');
    var navMenu = document.querySelector('.nav-links');
    var navMenuItems = document.querySelectorAll('.nav-links li');
    
    // hamburger clicked
    if (burgerButton) {
        burgerButton.addEventListener('click', function() {
            // mobile menu open/closed
            navMenu.classList.toggle('nav-active');
            
            // animate each menu item with a delay
            for (var i = 0; i < navMenuItems.length; i++) {
                var link = navMenuItems[i];
                
              
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    // staggered delay
                    var delay = i / 7 + 0.3;
                    link.style.animation = 'navLinkFade 0.5s ease forwards ' + delay + 's';
                }
            }
            
            // animate hamburger icon to X
            burgerButton.classList.toggle('toggle');
        });
    }
    
    
    // close mobile menu
    for (var i = 0; i < navMenuItems.length; i++) {
        var link = navMenuItems[i];
        
        
        link.addEventListener('click', function() {
            // mobile menu is open
            if (navMenu.classList.contains('nav-active')) {
                // close mobile menu
                navMenu.classList.remove('nav-active');
                
                // X back to a hamburger icon
                burgerButton.classList.remove('toggle');
                
                // no animations from all links
                for (var j = 0; j < navMenuItems.length; j++) {
                    navMenuItems[j].style.animation = '';
                }
            }
        });
    }
    
    
    // all sections and navigation links
    var pageSections = document.querySelectorAll('section');
    var navigationLinks = document.querySelectorAll('.nav-links a');
    
    //  user scrolls the page
    window.addEventListener('scroll', function() {
        // Get how far the user has scrolled down the page
        var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        var currentSection = '';
        for (var i = 0; i < pageSections.length; i++) {
            var section = pageSections[i];
            var sectionTop = section.offsetTop;
            var sectionHeight = section.clientHeight;
            if (scrollPosition >= (sectionTop - sectionHeight / 3)) {
                currentSection = section.getAttribute('id');
            }
        }
       
        for (var i = 0; i < navigationLinks.length; i++) {
            var link = navigationLinks[i];
            
           
            link.classList.remove('active');
            
            // get section this link points to
            var linkSection = link.getAttribute('href').substring(1);
            
            // link points to the current section
            if (linkSection === currentSection) {
                // Add active class to highlight it
                link.classList.add('active');
            }
        }
        
        // shrink navbar
        // get navigation bar
        var navbar = document.getElementById('navbar');
        
        // If scrolled more than 100 pixels
        if (scrollPosition > 100) {
            // navbar smaller
            navbar.style.padding = '0.5rem 5%';
        } else {
            // navbar normal size
            navbar.style.padding = '1rem 5%';
        }
    });
    
    
    // ===== FORM VALIDATION =====
    // get contact form
    var contactForm = document.querySelector('form');
    
    if (contactForm) {
        // When the form is submitted
        contactForm.addEventListener('submit', function(event) {
            // get form fields
            var nameField = document.getElementById('name');
            var emailField = document.getElementById('email');
            var messageField = document.getElementById('message');
            
            // track if the form is valid
            var formIsValid = true;
            
            // validate name field
            if (nameField.value.trim() === '') {
                // name is empty
                formIsValid = false;
                showErrorMessage(nameField, 'Name is required');
            } else {
                // name is valid
                removeErrorMessage(nameField);
            }
            
            // validate email field
            if (emailField.value.trim() === '') {
                // email is empty
                formIsValid = false;
                showErrorMessage(emailField, 'Email is required');
            } else if (!isValidEmailFormat(emailField.value)) {
                // email format is invalid
                formIsValid = false;
                showErrorMessage(emailField, 'Please enter a valid email');
            } else {
                // email is valid
                removeErrorMessage(emailField);
            }
            
            // validate message field
            if (messageField.value.trim() === '') {
                // message is empty
                formIsValid = false;
                showErrorMessage(messageField, 'Message is required');
            } else {
                // message is valid
                removeErrorMessage(messageField);
            }
            
            // if any field is invalid
            if (!formIsValid) {
                // prevent the form from submitting
                event.preventDefault();
            }
        });
    }
    
    // function to show an error message for a form field
    function showErrorMessage(inputField, message) {
        // Get the parent container of the input field
        var formGroup = inputField.parentElement;
        
        // look for an existing error message
        var errorElement = formGroup.querySelector('.error-message');
        
        // if no error message exists, create one
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        errorElement.style.color = '#e63946';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '0.5rem';
        
        // set the error message text
        errorElement.textContent = message;
        
        // highlight the input field with a red border
        inputField.style.borderColor = '#e63946';
    }
    
    // function to remove an error message
    function removeErrorMessage(inputField) {
        // Get the parent container of the input field
        var formGroup = inputField.parentElement;
        var errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
      
        inputField.style.borderColor = '#ddd';
    }
    
    // check if an email is valid
    function isValidEmailFormat(email) {
        // Simple email validation: must have @ and . characters
        return email.includes('@') && email.includes('.') && email.indexOf('@') < email.lastIndexOf('.');
    }
    
    
    //smooth scroll
    // get links that point to sections within the page
    var pageLinks = document.querySelectorAll('a[href^="#"]');
    for (var i = 0; i < pageLinks.length; i++) {
        var link = pageLinks[i];
        
        // when link is clicked
        link.addEventListener('click', function(event) {
            // prevent default jump to section
            event.preventDefault();
            
            // get target section ID
            var targetId = this.getAttribute('href');
            
            // find target section in the page
            var targetSection = document.querySelector(targetId);
            
            // if target section exists
            if (targetSection) {
                // scroll smoothly to section
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
});

$(document).ready(function() {
  // --- our code goes here ---
  
$('textarea').on('input', function() {
  
  const charCount = 140 - this.value.length
  
  this.nextElementSibling.children[1].innerText = charCount
  
  
})


});
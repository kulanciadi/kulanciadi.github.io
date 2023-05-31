document.addEventListener('mousemove', function(e) {
    var ring = document.getElementById('ring');
    ring.style.left = e.pageX - 15 + 'px';
    ring.style.top = e.pageY - 15 + 'px';
  });
  
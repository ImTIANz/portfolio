window.onload = function () {
    var backgroundMusic = document.getElementById("backgroundMusic");
    // Parse high scores from the URL query parameters
    var urlParams = new URLSearchParams(window.location.search);
    var highScoresData = urlParams.get("highScores");
    var highScores = JSON.parse(highScoresData) || [];
    var canvas = document.querySelector("canvas");
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    var c = canvas.getContext("2d");
  
    // Get high scores from localStorage
    var localHighScoresData = localStorage.getItem("highScores");
    var localHighScores = JSON.parse(localHighScoresData) || [];
  
    // Define a function to play the shooting sound
    var shootSound = document.getElementById("shootSound");
  
    function playShootSound() {
      shootSound.play();
    }
  
    function startGame() {
      var mouse = {
        x: innerWidth / 2,
        y: innerHeight - 33,
      };
  
      var canvas = document.querySelector("canvas");
  
      var player_width = 32;
      var player_height = 50;
      var playerImg = new Image();
      var score = 0;
      var health = 100;
      playerImg.src = "spaceship.png";
  
      var _bullets = [];
      var bullet_width = 6;
      var bullet_height = 8;
      var bullet_speed = 10;
  
      var _rightBullets = [];
      var _centerBullets = []; // New array for center bullets
      var _extraBullets = []; // New array for extra bullets
  
      var _enemies = [];
      var enemyImg = new Image();
      enemyImg.src =
        "https://i.ibb.co/0YgHvmx/enemy-fotor-20230927153748.png";
      var enemy_width = 32;
      var enemy_height = 32;
  
      var _healthkits = [];
      var healthkitImg = new Image();
      healthkitImg.src = "https://image.ibb.co/gFvSEU/first_aid_kit.png";
      var healthkit_width = 32;
      var healthkit_height = 32;
  
      function Player(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
  
        this.draw = function () {
          c.beginPath();
          c.drawImage(
            playerImg,
            mouse.x - player_width,
            mouse.y - player_height
          );
        };
  
        this.update = function () {
          this.draw();
        };
      }
  
      function Bullet(x, y, width, height, speed, direction) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.direction = direction;
  
        this.draw = function () {
          c.beginPath();
          c.rect(this.x, this.y, this.width, this.height);
          c.fillStyle = "white";
          c.fill();
        };
  
        this.update = function () {
          if (this.direction === "left") {
            this.y -= this.speed;
            this.x = mouse.x - bullet_width / 2;
          } else if (this.direction === "right") {
            this.y -= this.speed;
            this.x = mouse.x + player_width / 2 - this.width / 2;
          } else if (this.direction === "center") {
            this.y -= this.speed;
            this.x = mouse.x - this.width / 2;
          } else if (this.direction === "extra") {
            this.y -= this.speed;
            this.x = mouse.x - bullet_width / 2;
          }
  
          this.draw();
        };
      }
  
      function Enemy(x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
  
        this.draw = function () {
          c.beginPath();
          c.drawImage(enemyImg, this.x, this.y);
        };
  
        this.update = function () {
          this.y += this.speed;
          this.draw();
        };
      }
  
      function Healthkit(x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
  
        this.draw = function () {
          c.beginPath();
          c.drawImage(healthkitImg, this.x, this.y);
        };
  
        this.update = function () {
          this.y += this.speed;
          this.draw();
        };
      }
  
      var __player = new Player(
        mouse.x,
        mouse.y,
        player_width,
        player_height
      );
  
      function drawEnemies() {
        for (var _ = 0; _ < 4; _++) {
          var x = Math.random() * (innerWidth - enemy_width);
          var y = -enemy_height;
          var width = enemy_width;
          var height = enemy_height;
          var speed = Math.random() * 2;
          var __enemy = new Enemy(x, y, width, height, speed);
          _enemies.push(__enemy);
        }
      }
      setInterval(drawEnemies, 1234);
  
      function drawHealthkits() {
        for (var _ = 0; _ < 1; _++) {
          var x = Math.random() * (innerWidth - enemy_width);
          var y = -enemy_height;
          var width = healthkit_width;
          var height = healthkit_height;
          var speed = Math.random() * 2.6;
          var __healthkit = new Healthkit(x, y, width, height, speed);
          _healthkits.push(__healthkit);
        }
      }
      setInterval(drawHealthkits, 15000);
  
      function fire() {
        // Fire a bullet from the left side
        var leftBullet = new Bullet(
          mouse.x - bullet_width / 2,
          mouse.y - player_height,
          bullet_width,
          bullet_height,
          bullet_speed,
          "left"
        );
        _bullets.push(leftBullet);
  
        // Fire a bullet from the right side
        var rightBullet = new Bullet(
          mouse.x + player_width / 2 - bullet_width / 2,
          mouse.y - player_height,
          bullet_width,
          bullet_height,
          bullet_speed,
          "right"
        );
        _rightBullets.push(rightBullet);
  
        // Fire a bullet from the center
        var centerBullet = new Bullet(
          mouse.x - bullet_width / 2,
          mouse.y - player_height,
          bullet_width,
          bullet_height,
          bullet_speed,
          "center"
        );
        _centerBullets.push(centerBullet);
  
        // Fire an extra bullet (customize as needed)
        var extraBullet = new Bullet(
          mouse.x - bullet_width / 2,
          mouse.y - player_height,
          bullet_width,
          bullet_height,
          bullet_speed,
          "extra"
        );
        _extraBullets.push(extraBullet);
  
        // Play the shooting sound
        playShootSound();
      }
  
      // Automatically fire bullets continuously
      setInterval(fire, 200);
  
      canvas.addEventListener("mousemove", function (event) {
        mouse.x = event.clientX;
      });
  
      canvas.addEventListener("touchmove", function (event) {
        var rect = canvas.getBoundingClientRect();
        var root = document.documentElement;
        var touch = event.changedTouches[0];
        var touchX = parseInt(touch.clientX);
        var touchY = parseInt(touch.clientY) - rect.top - root.scrollTop;
        event.preventDefault();
        mouse.x = touchX;
        mouse.y = touchY;
      });
  
      var isPaused = false; // Variable to track the game pause state
      var pauseIcon = document.getElementById("pauseIcon");
      var pauseText = document.getElementById("pauseText");
      var pauseContainer = document.getElementById("pauseContainer");
  
      // Function to pause or resume the game
      function togglePause() {
        if (isPaused) {
          isPaused = false;
          pauseText.textContent = "Game Resumed";
          pauseIcon.classList.remove("fa-play");
          pauseIcon.classList.add("fa-pause");
          pauseContainer.style.backgroundColor = "transparent"; // Remove background color
          animate(); // Resume the game loop
        } else {
          isPaused = true;
          pauseText.textContent = "Game Paused";
          pauseIcon.classList.remove("fa-pause");
          pauseIcon.classList.add("fa-play");
          pauseContainer.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // Add a semi-transparent background
        }
      }
  
      // Event listener to toggle pause when the pause icon is clicked
      pauseIcon.addEventListener("click", togglePause);
  
      canvas.addEventListener("click", function () {});
  
      function collision(a, b) {
        return (
          a.x < b.x + b.width &&
          a.x + a.width > b.x &&
          a.y < b.y + b.height &&
          a.y + a.height > b.y
        );
      }
      c.font = "1em Arial";
  
      function stoperror() {
        return true;
      }
      window.onerror = stoperror;
  
      function animate() {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, innerWidth, innerHeight);
        c.fillStyle = "white";
        c.fillText("Health: " + health, 5, 20);
        c.fillText("Score: " + score, innerWidth - 100, 20);
  
        __player.update();
  
        for (var i = 0; i < _bullets.length; i++) {
          _bullets[i].update();
          if (_bullets[i].y < 0) {
            _bullets.splice(i, 1);
          }
        }
  
        for (var j = 0; j < _rightBullets.length; j++) {
          _rightBullets[j].update();
          if (_rightBullets[j].y < 0) {
            _rightBullets.splice(j, 1);
          }
        }
  
        for (var k = 0; k < _enemies.length; k++) {
          _enemies[k].update();
          if (_enemies[k].y > innerHeight) {
            _enemies.splice(k, 1);
            health -= 10;
            if (health === 0) {
              alert("You DIED!\nYour score was " + score);
              startGame();
            }
          }
        }
  
        for (var l = _bullets.length - 1; l >= 0; l--) {
          for (var m = _enemies.length - 1; m >= 0; m--) {
            if (collision(_enemies[m], _bullets[l])) {
              _enemies.splice(m, 1);
              _bullets.splice(l, 1);
              score++;
            }
          }
        }
  
        for (var n = _centerBullets.length - 1; n >= 0; n--) {
          _centerBullets[n].update();
          if (_centerBullets[n].y < 0) {
            _centerBullets.splice(n, 1);
          }
        }
  
        // Check collision with center bullets
        for (var o = _centerBullets.length - 1; o >= 0; o--) {
          for (var p = _enemies.length - 1; p >= 0; p--) {
            if (collision(_enemies[p], _centerBullets[o])) {
              _enemies.splice(p, 1);
              _centerBullets.splice(o, 1);
              score++;
            }
          }
        }
  
        for (var q = _extraBullets.length - 1; q >= 0; q--) {
          _extraBullets[q].update();
          if (_extraBullets[q].y < 0) {
            _extraBullets.splice(q, 1);
          }
        }
  
        // Check collision with extra bullets
        for (var r = _extraBullets.length - 1; r >= 0; r--) {
          for (var s = _enemies.length - 1; s >= 0; s--) {
            if (collision(_enemies[s], _extraBullets[r])) {
              _enemies.splice(s, 1);
              _extraBullets.splice(r, 1);
              score++;
            }
          }
        }
  
        for (var h = 0; h < _healthkits.length; h++) {
          _healthkits[h].update();
        }
        for (var hh = _healthkits.length - 1; hh >= 0; hh--) {
          for (var hhh = _bullets.length - 1; hhh >= 0; hhh--) {
            if (collision(_healthkits[hh], _bullets[hhh])) {
              _healthkits.splice(hh, 1);
              _bullets.splice(hhh, 1);
              health += 10;
            }
          }
        }
      }
  
      animate();
    }
  
    startGame();
  };
  
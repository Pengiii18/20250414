let particles = [];
let centerPos;
let centerStr = 0.001; // 中心吸引力強度
let attStr = 24; // 吸引力強度
let repStr = 50; // 排斥力強度
let maxVel = 36;
let radius = 24;
let num = 201;
let d = 500;
let backgroundCircles = []; // 新增背景圓圈的陣列

function setup() {
  createCanvas(windowWidth, windowHeight); // 修改為填滿整個視窗
  centerPos = createVector(width / 2, height / 2);

  for (let i = 0; i < num; i++) {
    let x = random(width);
    let y = random(height);
    particles.push(new Particle(x, y, radius));
  }

  // 初始化背景圓圈，增加數量至 100
  for (let i = 0; i < 100; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(10, 30);
    backgroundCircles.push(new BackgroundCircle(x, y, r));
  }

  createMenu();
}

function draw() {
  background("#FFBD60");

  // 繪製背景圓圈並更新動畫
  for (let circle of backgroundCircles) {
    circle.update();
    circle.show();
  }

  fill("#4A4949");
  circle(width / 2, height / 2, d + 20);
  fill("#000000");
  circle(width / 2, height / 2, d);

  for (let p of particles) {
    for (let target of particles) {
      if (p != target) {
        p.updateForce(target);
      }
    }
    p.acc.add(p.pos.copy().sub(centerPos).mult(-centerStr));
    p.update();

    if (p.pos.dist(centerPos) < d / 2 - 30) {
      p.show();
    }
  }

  // 在右下角顯示文字
  fill(0);
  textSize(16);
  textAlign(RIGHT, BOTTOM);
  text("410730948彭得邦期中報告", width - 10, height - 10);
}

function mouseDragged() {
  for (let p of particles) {
    p.updateMouse();
  }
}

function createMenu() {
  const menu = createElement('ul');
  menu.style('position', 'absolute');
  menu.style('top', '10px');
  menu.style('left', '10px');
  menu.style('background', '#fff');
  menu.style('padding', '10px');
  menu.style('border', '1px solid #ccc');
  menu.style('list-style', 'none');
  menu.style('display', 'flex'); // 修改為橫向排列

  const items = ['自我介紹', '作品集', '測驗卷', '教學影片'];
  const links = [
    'https://pengiii18.github.io/20250317/', // 自我介紹
    null, // 作品集
    'https://pengiii18.github.io/20250310/', // 測驗卷
    'https://cfchen58.synology.me/%E7%A8%8B%E5%BC%8F%E8%A8%AD%E8%A8%882024/A2/week8/20250411_092029.mp4' // 教學影片
  ];
  const colors = ['#FFCCCC', '#CCFFCC', '#CCCCFF', '#FFFFCC']; // 每個按鈕的背景顏色

  items.forEach((item, index) => {
    const li = createElement('li');
    const link = createSpan(item); // 使用 span 代替 <a>，避免跳轉
    link.style('text-decoration', 'none');
    link.style('color', 'black');
    link.style('cursor', 'pointer');
    li.child(link);

    li.style('margin', '0 15px'); // 調整橫向間距
    li.style('padding', '15px 30px'); // 進一步增加按鈕大小
    li.style('background', colors[index]); // 設定背景顏色
    li.style('border-radius', '8px'); // 添加圓角
    li.style('font-size', '18px'); // 增加字體大小
    li.style('position', 'relative'); // 確保子選單相對於父元素定位

    // 點擊顯示內容
    if (links[index]) {
      link.mousePressed(() => showContent(links[index]));
    }

    // 為 "作品集" 添加子選單
    if (item === '作品集') {
      const subMenu = createElement('ul');
      subMenu.style('position', 'absolute');
      subMenu.style('top', '100%'); // 設置子選單出現在按鈕正下方
      subMenu.style('left', '0');
      subMenu.style('background', '#fff');
      subMenu.style('padding', '10px');
      subMenu.style('border', '1px solid #ccc');
      subMenu.style('list-style', 'none');
      subMenu.style('display', 'none'); // 預設隱藏

      const subItems = [
        { name: '第一周作業', link: 'https://pengiii18.github.io/20250303/' },
        { name: '第二周作業', link: 'https://pengiii18.github.io/20250317/' },
        { name: '第三周作業', link: 'https://pengiii18.github.io/20250324/' },
        { name: '第四周作業', link: 'https://pengiii18.github.io/20250407./#' }
      ];

      subItems.forEach((subItem) => {
        const subLi = createElement('li');
        const subLink = createSpan(subItem.name);
        subLink.style('text-decoration', 'none');
        subLink.style('color', 'black');
        subLink.style('cursor', 'pointer');
        subLi.child(subLink);

        subLi.style('margin', '5px 0');
        subLi.style('padding', '5px 10px');
        subLi.style('background', '#EEEEEE');
        subLi.style('border-radius', '5px');
        subLi.style('cursor', 'pointer');
        subMenu.child(subLi);

        // 點擊顯示內容
        subLink.mousePressed(() => showContent(subItem.link));
      });

      li.child(subMenu);

      // 顯示/隱藏子選單
      li.mouseOver(() => subMenu.style('display', 'block'));
      li.mouseOut(() => subMenu.style('display', 'none'));
    }

    menu.child(li);
  });
}

function showContent(url) {
  const iframe = createElement('iframe');
  iframe.attribute('src', url);
  iframe.style('position', 'absolute');
  iframe.style('top', '50px');
  iframe.style('left', '50px');
  iframe.style('width', '80%');
  iframe.style('height', '80%');
  iframe.style('border', '2px solid #ccc');
  iframe.style('background', '#fff');

  const closeButton = createButton('關閉');
  closeButton.style('position', 'absolute');
  closeButton.style('top', '50px');
  closeButton.style('left', 'calc(50px + 80%)');
  closeButton.style('transform', 'translateX(-100%)');
  closeButton.style('padding', '5px 10px');
  closeButton.style('background', '#FF6666');
  closeButton.style('color', '#fff');
  closeButton.style('border', 'none');
  closeButton.style('cursor', 'pointer');

  closeButton.mousePressed(() => {
    iframe.remove();
    closeButton.remove();
  });

  document.body.appendChild(iframe.elt);
  document.body.appendChild(closeButton.elt);
}

class Particle {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.r = r;
    this.aStr = attStr;
    this.rStr = repStr;
    this.col = "#B663F7";
  }

  show() {
    fill(this.col);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }

  update() {
    this.vel.add(this.acc);
    this.acc.mult(0);
    if (this.vel.mag() > maxVel) this.vel.setMag(maxVel);
    this.pos.add(this.vel);

    this.vel.mult(0.92);

    // 根據與中心的距離調整顏色與大小
    let dist = centerPos.dist(this.pos);
    this.r = map(dist, 0, 165, radius, 0);
    let c1 = map(dist, 0, 165, 100, 80);
    let c2 = map(dist, 0, 165, 200, 100);
    this.col = color(234, c1, c2);
  }

  updateForce(target) {
    let force = p5.Vector.sub(target.pos, this.pos);
    let d = force.mag();
    force.normalize();

    if (d > 0.5) {
      if (d <= this.r * 16) {
        let attForce = force.copy().mult(this.aStr / (d * d));
        this.acc.add(attForce);
      }
      if (d <= this.r * 32) {
        let repForce = force.copy().mult(-this.rStr / (d * d));
        this.acc.add(repForce);
      }
      if (d < this.r * 1.5 + target.r) {
        let overlapForce = force.copy().mult(d - (this.r * 1.5 + target.r));
        this.vel.add(overlapForce.copy().mult(0.5));
        target.vel.add(overlapForce.mult(-0.5));
      }
    }
  }

  updateMouse() {
    let mousePos = createVector(mouseX, mouseY);
    let force = p5.Vector.sub(mousePos, this.pos);
    let d = force.mag();
    force.normalize();

    if (d < maxVel * 2) {
      let repForce = force.copy().mult(-1);
      this.acc.add(repForce);
    }
  }
}

class BackgroundCircle {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.r = r;
    this.offset = random(TWO_PI); // 隨機偏移量
  }

  update() {
    // 增加移動速度
    let angle = atan2(mouseY - this.pos.y, mouseX - this.pos.x);
    this.pos.x += cos(angle + this.offset) * 4; // 調整移動速度
    this.pos.y += sin(angle + this.offset) * 4; // 調整移動速度
  }

  show() {
    noStroke();
    fill(255, 100, 100, 150); // 調整顏色為更明顯的紅色
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}

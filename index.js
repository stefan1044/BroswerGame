(() => {
    "use strict";

    class t {
        constructor(t, e, s) {
            this.x = t, this.y = e, this.id = s, this.speed = Math.random() / 500, this.speed < .001 &&
            (this.speed = .001);
            const i = Math.floor(6 * Math.random()) + 6;
            this.height = i, this.width = .48802 * i, this.brightness = !0
        }

        getCoordinates() {
            return [this.x, this.y]
        }

        getHeight() {
            return this.height
        }

        getWidth() {
            return this.width
        }

        getSpeed() {
            return this.speed
        }

        getShape() {
            return this.shape
        }

        getId() {
            return this.id
        }

        appendToHtml(t) {
            this.html = document.createElement("div");
            const e = this.getCoordinates();
            this.html.className = this.getShape(), this.html.id = this.getId().toString(), this.html.style.left =
                `${e[0].toString()}vw`, this.html.style.top = `${e[1].toString()}vh`, this.html.style.width =
                `${this.width}vw`, this.html.style.height = `${this.height}vh`, this.html.style.zIndex =
                this.getId().toString(), t.appendChild(this.html)
        }

        swapBrightness() {
            if (!0 === this.brightness) return this.brightness = !1, this.html.style.filter =
                "brightness(70%)", void (this.html.style.opacity = "50%");
            this.brightness = !0, this.html.style.filter = "brightness(100%)", this.html.style.opacity = "100%"
        }

        checkCollision(t) {
            const e = t.getCoordinates();
            return !(e[0] + t.getWidth() < this.x || e[0] > this.x + this.width || e[1] + t.getHeight() < this.y ||
                e[1] > this.y + this.height)
        }
    }

    var e, s;
    !function (t) {
        t.Chaser = "Chaser", t.Random = "Random", t.Escape = "Escape"
    }(e || (e = {})), function (t) {
        t.Circle = "circle", t.Square = "square", t.Triangle = "triangle"
    }(s || (s = {}));
    const i = class extends t {
        constructor(t, i, h) {
            super(t, i, h), this.type = e.Chaser, this.shape = s.Triangle
        }

        revert() {
            this.x = this.oldX, this.y = this.oldY
        }

        stopSpinning(t) {
            this.html.style.animation = "", t.appendChild(this.html)
        }

        move(t, e) {
            this.oldX = this.x, this.oldY = this.y, this.x +=
                this.speed * ((100 - Math.abs(this.x - t)) / 5 + 1) * (this.x > t ? -1 : 1), this.y +=
                this.speed * ((100 - Math.abs(this.y - e)) / 5 + 1) * (this.y > e ? -1 : 1), this.x > 100 - this.width ?
                this.x = 100 - this.width : this.x < 0 && (this.x = 0), this.y > 100 - this.height ?
                this.y = 100 - this.height : this.y < 0 && (this.y = 0)
        }

        onHitTarget() {
            return "Over"
        }
    }, h = class extends t {
        constructor(t, i, h) {
            super(t, i, h), this.type = e.Escape, this.shape = s.Circle, this.speed *= .5, this.canGiveScore =
                !0, this.canMove = !0, this.evade = !0
        }

        move(t, e) {
            this.canMove &&
            (this.x += this.speed * (100 - Math.abs(this.x - t) / 2 + 1) * (this.x > t ? 1 : -1), this.y +=
                this.speed * (100 - Math.abs(this.y - e) / 2 + 1) * (this.y > e ? 1 : -1), this.x > 100 - this.width ?
                this.x = 100 - this.width : this.x < 0 && (this.x = 0), this.y > 100 - this.height ?
                this.y = 100 - this.height : this.y < 0 && (this.y = 0))
        }

        forceMove() {
            this.x += this.pushX, this.y += this.pushY, this.x > 100 - this.width ? this.x = 100 - this.width :
                this.x < 0 && (this.x = 0), this.y > 100 - this.height ? this.y = 100 - this.height :
                this.y < 0 && (this.y = 0)
        }

        push(t) {
            if (100 === t) return this.canMove = !0, this.canGiveScore = !0, this.html.style.opacity =
                "100%", void (this.evade = !0);
            setTimeout((() => {
                this.forceMove(), this.push(t + 1)
            }), 5)
        }

        onHitTarget() {
            return this.canGiveScore ?
                (this.canGiveScore = !1, this.canMove = !1, this.html.style.opacity = "30%", this.pushX =
                    Math.random() / 4 * (Math.random() > .5 ? 1 : -1), this.pushY =
                    Math.random() / 4 * (Math.random() > .5 ? 1 : -1), this.push(0), "Score") :
                (this.evade && (this.evade = !1, setTimeout((() => {
                    this.evade = !0
                }), 25), this.pushX *= 1.5, this.pushY *= 1.5), "")
        }
    }, n = class extends t {
        constructor(t, i, h) {
            super(t, i, h), this.type = e.Random, this.shape = s.Square, this.xPath =
                Math.random() * (Math.random() > .5 ? 1 : -1) * 80, this.yPath =
                Math.random() * (Math.random() > .5 ? 1 : -1) * 80
        }

        changePath() {
            this.xPath = Math.random() * (Math.random() > .5 ? 1 : -1) * 110, this.yPath =
                Math.random() * (Math.random() > .5 ? 1 : -1) * 110, this.xPath < 15 && (this.xPath += 15), this.yPath <
            15 && (this.yPath += 15)
        }

        move() {
            this.x > 100 - this.width ? (this.x = 100 - this.width, this.changePath()) :
                this.x < 0 && (this.changePath(), this.x = 0, this.changePath()), this.y > 100 - this.height ?
                (this.y = 100 - this.height, this.changePath()) :
                this.y < 0 && (this.y = 0, this.changePath()), this.x += this.xPath * this.speed, this.y +=
                this.yPath * this.speed
        }

        onHitTarget() {
            return "Over"
        }
    };

    class a {
        constructor(t, e, s) {
            this.x = t, this.y = e, this.speed = s
        }

        getCoordinates() {
            return [this.x, this.y]
        }

        getSpeed() {
            return this.speed
        }

        move(t, e) {
            this.x += (t - this.x) * this.speed / 10 + (t - this.x > 0 ? 1 : -1) * this.speed, this.y +=
                (e - this.y) * this.speed / 10 + (e - this.y > 0 ? 1 : -1) * this.speed, this.x > 97 ? this.x = 97 :
                this.x < 0 && (this.x = 0), this.y > 94 ? this.y = 94 : this.y < 0 && (this.y = 0)
        }

        checkCollision(t) {
            const e = t.getCoordinates();
            if ("triangle" !== t.getShape()) {
                if (e[0] + t.getWidth() < this.x) return !1;
                if (e[0] > this.x + 3) return !1;
                if (e[1] + t.getHeight() < this.y) return !1;
                if (e[1] > this.y + 6) return !1
            } else {
                if (e[0] + .9 * t.getWidth() < this.x) return !1;
                if (e[0] > this.x + 2.92812 * .9) return !1;
                if (e[1] + t.getHeight() < this.y) return !1;
                if (e[1] > this.y + 4.5) return !1
            }
            return !0
        }
    }

    let r = document.getElementById("chaserValue"), o = document.getElementById("randomValue"),
        d = document.getElementById("escapeValue"), l = document.getElementById("randomEnemyValue");
    const c = document.getElementById("chaserRange"), m = document.getElementById("randomRange"),
        y = document.getElementById("escapeRange"), g = document.getElementById("randomEnemyRange");
    c.oninput = () => {
        r.innerHTML = `Chasers: ${c.value}`
    }, m.oninput = () => {
        o.innerHTML = `Randoms: ${m.value}`
    }, y.oninput = () => {
        d.innerHTML = `Escapes: ${y.value}`
    }, g.oninput = () => {
        l.innerHTML = `Random enemies: ${g.value}`
    };
    const p = new class {
        constructor() {
            this.body = document.getElementById("canvas"), this.enemies = new Array, this.chasers =
                new Array, this.windowHeight = window.innerHeight, this.windowWidth =
                window.innerWidth, document.addEventListener("mousemove", this.setMouseCoordinates.bind(this))
        }

        setMouseCoordinates(t) {
            this.mouseX = t.pageX / this.windowWidth * 100, this.mouseY = t.pageY / this.windowHeight * 100
        }

        renderMenu() {
        }

        cleanup(t) {
            this.endMenu.remove(), this.playerDiv.remove(), this.scoreDiv.remove();
            for (const t of this.enemies) document.getElementById(t.getId().toString()).remove();
            for (; this.enemies.length > 0;) this.enemies.pop();
            for (; this.chasers.length > 0;) this.chasers.pop();
            this.body.style.filter = "brightness(100%)", !0 !== t ?
                document.getElementById("difficultyPage").style.display = "initial" :
                this.startGame(this.startSetting[0], this.startSetting[1], this.startSetting[2], this.startSetting[3])
        }

        endGame() {
            clearInterval(this.actionInterval), clearInterval(this.scoreInterval), this.endMenu =
                document.createElement("div"), this.endMenu.className = "endMenu";
            const t = document.createElement("h1");
            t.innerHTML = `Ended game with score ${this.score}\n             Restart?`, this.endMenu.appendChild(t);
            const e = document.createElement("button");
            e.innerHTML = "RESTART", e.addEventListener("click", this.cleanup.bind(this, !0)), this.endMenu.appendChild(
                e);
            const s = document.createElement("button");
            s.innerHTML = "MENU", s.className = "endMenuButton", s.addEventListener(
                "click", this.cleanup.bind(this, !1)), this.endMenu.appendChild(s), this.score = 0;
            for (const t of this.enemies) t.swapBrightness();
            this.body.style.filter = "brightness(60%)", this.playerDiv.style.filter =
                "brightness(70%)", this.playerDiv.style.opacity = "50%";
            for (const t of this.chasers) t.stopSpinning(this.body);
            this.body.appendChild(this.endMenu)
        }

        shuffleArray(t) {
            for (let e = t.length - 1; e > 0; e--) {
                const s = Math.floor(Math.random() * (e + 1));
                [t[e], t[s]] = [t[s], t[e]]
            }
        }

        redraw() {
            const t = this.player.getCoordinates();
            document.getElementById("0").style.left = `${t[0]}vw`, document.getElementById("0").style.top = `${t[1]}vh`;
            for (const t of this.enemies) document.getElementById(t.getId().toString()).style.left =
                `${t.getCoordinates()[0]}vw`, document.getElementById(t.getId().toString()).style.top =
                `${t.getCoordinates()[1]}vh`;
            this.scoreDiv.innerHTML = `${this.score}`
        }

        actionQueue() {
            const t = this.player.getCoordinates();
            void 0 !== this.mouseX && void 0 !== this.mouseY && this.player.move(this.mouseX, this.mouseY);
            for (const e of this.enemies) {
                if (this.player.checkCollision(e)) {
                    const t = e.onHitTarget();
                    "Over" === t ? this.endGame() : "Score" === t && (this.score += 5)
                }
                "square" === e.getShape() ? e.move() : "circle" === e.getShape() && e.move(t[0], t[1])
            }
            let e = [];
            for (let t = 0; t < this.chasers.length; t++) {
                e[t] = [];
                for (let s = 0; s < this.chasers.length; s++) e[t][s] = !1
            }
            this.shuffleArray(this.chasers);
            for (let s = 0; s < this.chasers.length; s++) {
                this.chasers[s].move(t[0], t[1]);
                let i = !0;
                for (let t = 0; t < this.chasers.length; t++) if (this.chasers[s].getId() !== this.chasers[t].getId() &&
                    !0 !== e[s][t] && this.chasers[s].checkCollision(this.chasers[t])) {
                    i = !1, e[t][s] = !0;
                    break
                }
                i || this.chasers[s].revert()
            }
            this.redraw()
        }

        startGame(t, s, r, o) {
            document.getElementById("difficultyPage").style.display = "none", this.startSetting =
                [t, s, r, o], this.score = 0, this.scoreDiv = document.createElement("h1"), this.scoreDiv.className =
                "score", this.scoreDiv.innerHTML = `${this.score}`, this.scoreDiv.style.zIndex =
                "-1", this.body.appendChild(this.scoreDiv), this.player = new a(50, 50, .05), this.playerDiv =
                document.createElement("div"), this.playerDiv.id = "0", this.playerDiv.className =
                "player", this.playerDiv.style.left = "50vw", this.playerDiv.style.top =
                "50vh", this.playerDiv.style.zIndex = "2000000", this.body.appendChild(
                this.playerDiv), this.actionInterval = setInterval(this.actionQueue.bind(this), 5), this.scoreInterval =
                setInterval((() => {
                    this.score++
                }), 1e3);
            const d = new class {
                constructor() {
                    this.enemiesCreated = 0
                }

                getRandomEnemy() {
                    const t = Math.floor(3 * Math.random());
                    let e = Math.floor(88 * Math.random()), s = Math.floor(88 * Math.random());
                    for (; e > 35 && e < 65 && s > 35 && s < 65;) e = 88 * Math.random(), s = 88 * Math.random();
                    return 1 === t ? (this.enemiesCreated++, new i(e, s, this.enemiesCreated)) :
                        2 === t ? (this.enemiesCreated++, new h(e, s, this.enemiesCreated)) :
                            (this.enemiesCreated++, new n(e, s, this.enemiesCreated))
                }

                getSpecificEnemy(t) {
                    let s = Math.floor(88 * Math.random()), a = Math.floor(88 * Math.random());
                    for (; s > 35 && s < 65 && a > 35 && a < 65;) s = 88 * Math.random(), a = 88 * Math.random();
                    return this.enemiesCreated++, t === e.Chaser ? new i(s, a, this.enemiesCreated) :
                        t === e.Escape ? new h(s, a, this.enemiesCreated) :
                            t === e.Random ? new n(s, a, this.enemiesCreated) : void 0
                }

                getEnemiesCreated() {
                    return this.enemiesCreated
                }
            };
            for (let s = 0; s < t; s++) {
                let t = d.getSpecificEnemy(e.Chaser);
                t.appendToHtml(this.body), this.enemies.push(t), this.chasers.push(t)
            }
            for (let t = 0; t < r; t++) {
                let t = d.getSpecificEnemy(e.Escape);
                t.appendToHtml(this.body), this.enemies.push(t)
            }
            for (let t = 0; t < s; t++) {
                let t = d.getSpecificEnemy(e.Random);
                t.appendToHtml(this.body), this.enemies.push(t)
            }
            for (let t = 0; t < o; t++) {
                let t = d.getRandomEnemy();
                t.appendToHtml(this.body), this.enemies.push(t), "triangle" === t.getShape() && this.chasers.push(t)
            }
        }
    };
    document.getElementById("startButton").addEventListener("click", (() => {
        const t = parseInt(document.getElementById("chaserRange").value),
            e = parseInt(document.getElementById("randomRange").value),
            s = parseInt(document.getElementById("escapeRange").value),
            i = parseInt(document.getElementById("randomEnemyRange").value);
        p.startGame(t, e, s, i)
    }))
})();
import {
  RouterLink,
  RouterOutlet,
  init_router
} from "./chunk-7B6TOZY3.js";
import {
  Component,
  TestBed,
  __async,
  __commonJS,
  __decorate,
  __esm,
  init_core,
  init_testing,
  init_tslib_es6,
  provideZonelessChangeDetection
} from "./chunk-EUULFLPO.js";

// angular:jit:template:src/app/app.html
var app_default;
var init_app = __esm({
  "angular:jit:template:src/app/app.html"() {
    app_default = "<app-header></app-header>\n\n<router-outlet></router-outlet>";
  }
});

// angular:jit:style:src/app/app.css
var app_default2;
var init_app2 = __esm({
  "angular:jit:style:src/app/app.css"() {
    app_default2 = "/* src/app/app.css */\n/*# sourceMappingURL=app.css.map */\n";
  }
});

// angular:jit:template:src/app/shared/components/header/header.html
var header_default;
var init_header = __esm({
  "angular:jit:template:src/app/shared/components/header/header.html"() {
    header_default = '<header class="main-header">\n  <div class="header-content">\n    <div class="logo">\n    <a routerLink="/home">\n    <img src="assets/logo/logotype.png" alt="Logo da InovaTech">\n    </a>\n  </div>\n    <nav class="main-nav">\n  <ul>\n    <li><a routerLink="/home" class="active">In\xEDcio</a></li>\n    \n    <li><a routerLink="">Eventos</a></li>\n    \n    <li><a routerLink="">Criar Evento</a></li>\n  </ul>\n</nav>\n    <button class="login-btn" routerLink="/login">\n      <span>Login</span>\n      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n        <path d="M14 4L12.59 5.41L18.17 11H2V13H18.17L12.59 18.59L14 20L22 12L14 4Z" fill="currentColor"/>\n      </svg>\n    </button>\n  </div>\n</header>';
  }
});

// angular:jit:style:src/app/shared/components/header/header.css
var header_default2;
var init_header2 = __esm({
  "angular:jit:style:src/app/shared/components/header/header.css"() {
    header_default2 = '@import "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap";\n\n/* src/app/shared/components/header/header.css */\n.main-header {\n  width: 100%;\n  padding: 1rem 5%;\n  background-color: transparent;\n  top: 0;\n  left: 0;\n  z-index: 10;\n  font-family: "Poppins", sans-serif;\n}\n.header-content {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  max-width: 1400px;\n  margin: 0 auto;\n}\n.logo {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  font-size: 1.5rem;\n  font-weight: 600;\n  color: white;\n}\n.logo img {\n  width: 160px;\n  height: auto;\n}\n.main-nav ul {\n  display: flex;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  gap: 1rem;\n}\n.main-nav a {\n  text-decoration: none;\n  color: #dcdcdc;\n  font-size: 1rem;\n  font-weight: 500;\n  transition: color 0.3s ease;\n}\n.main-nav a:hover,\n.main-nav a.active {\n  color: white;\n}\n.login-btn {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  background-color: white;\n  color: #333;\n  border: none;\n  padding: 0.75rem 1.5rem;\n  border-radius: 999px;\n  font-size: 1rem;\n  font-weight: 500;\n  cursor: pointer;\n  transition: transform 0.2s ease;\n}\n.login-btn:hover {\n  transform: scale(1.05);\n}\n/*# sourceMappingURL=header.css.map */\n';
  }
});

// src/app/shared/components/header/header.ts
var Header;
var init_header3 = __esm({
  "src/app/shared/components/header/header.ts"() {
    "use strict";
    init_tslib_es6();
    init_header();
    init_header2();
    init_core();
    init_router();
    Header = class Header2 {
    };
    Header = __decorate([
      Component({
        selector: "app-header",
        imports: [
          RouterLink
        ],
        template: header_default,
        styles: [header_default2]
      })
    ], Header);
  }
});

// src/app/app.ts
var App;
var init_app3 = __esm({
  "src/app/app.ts"() {
    "use strict";
    init_tslib_es6();
    init_app();
    init_app2();
    init_core();
    init_router();
    init_header3();
    App = class App2 {
      title = "InovaTech";
    };
    App = __decorate([
      Component({
        selector: "app-root",
        standalone: true,
        imports: [
          RouterOutlet,
          Header
        ],
        template: app_default,
        styles: [app_default2]
      })
    ], App);
  }
});

// src/app/app.spec.ts
var require_app_spec = __commonJS({
  "src/app/app.spec.ts"(exports) {
    init_core();
    init_testing();
    init_app3();
    describe("App", () => {
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [App],
          providers: [provideZonelessChangeDetection()]
        }).compileComponents();
      }));
      it("should create the app", () => {
        const fixture = TestBed.createComponent(App);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
      });
      it("should render title", () => {
        const fixture = TestBed.createComponent(App);
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector("h1")?.textContent).toContain("Hello, eventos-esii");
      });
    });
  }
});
export default require_app_spec();
//# sourceMappingURL=spec-app-app.spec.js.map

import {
  RouterLink,
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
  init_tslib_es6
} from "./chunk-EUULFLPO.js";

// angular:jit:template:src/app/pages/home/home.html
var home_default;
var init_home = __esm({
  "angular:jit:template:src/app/pages/home/home.html"() {
    home_default = '<main class="home-container">\n\n  <div class="content-card">\n    <div class="text-content">\n      <h1>Bem-vindo ao InovaTech</h1>\n      <p>\n        Fa\xE7a a inscri\xE7\xE3o para participar dos nossos eventos exclusivos. Mantenha-se\n        atualizado com as \xFAltimas novidades e oportunidades de aprendizado.\n      </p>\n      <button class="cta-button" routerLink="/registration">\n        <span>Fa\xE7a o seu cadastro</span>\n        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n          <path d="M14 4L12.59 5.41L18.17 11H2V13H18.17L12.59 18.59L14 20L22 12L14 4Z" fill="currentColor"/>\n        </svg>\n      </button>\n    </div>\n    <div class="image-content">\n      <img src="assets/images/home-image.jpg" alt="Imagem home">\n    </div>\n  </div>\n\n  <section class="events-section">\n    <h2 class="section-title">Nossos Pr\xF3ximos Eventos</h2>\n    <div class="events-grid">\n\n      <div class="event-card">\n        <img class="event-image" src="assets/images/event.jpg" alt="Palestra sobre IA">\n        <div class="event-info">\n          <h3 class="event-title">Confer\xEAncia de IA 2025</h3>\n          <p class="event-date">25 de Outubro, 2025</p>\n          <p class="event-description">Explore o futuro da Intelig\xEAncia Artificial com os maiores especialistas da \xE1rea.</p>\n        </div>\n      </div>\n\n      <div class="event-card">\n        <img class="event-image" src="assets/images/event.jpg" alt="Workshop de Angular">\n        <div class="event-info">\n          <h3 class="event-title">Workshop Avan\xE7ado de Angular</h3>\n          <p class="event-date">15 de Novembro, 2025</p>\n          <p class="event-description">Aprenda t\xE9cnicas e padr\xF5es avan\xE7ados para suas aplica\xE7\xF5es com o framework.</p>\n        </div>\n      </div>\n\n      <div class="event-card">\n        <img class="event-image" src="assets/images/event.jpg" alt="Feira de Ciberseguran\xE7a">\n        <div class="event-info">\n          <h3 class="event-title">Feira de Ciberseguran\xE7a</h3>\n          <p class="event-date">05 de Dezembro, 2025</p>\n          <p class="event-description">Descubra as \xFAltimas tend\xEAncias e solu\xE7\xF5es para a prote\xE7\xE3o de dados.</p>\n        </div>\n      </div>\n\n    </div>\n  </section>\n  <button class="cta-button" routerLink="/eventos">\n    <span>Saiba Mais</span>\n    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n      <path d="M14 4L12.59 5.41L18.17 11H2V13H18.17L12.59 18.59L14 20L22 12L14 4Z" fill="currentColor"/>\n    </svg>\n  </button>\n\n</main>';
  }
});

// angular:jit:style:src/app/pages/home/home.css
var home_default2;
var init_home2 = __esm({
  "angular:jit:style:src/app/pages/home/home.css"() {
    home_default2 = '/* src/app/pages/home/home.css */\n.home-container {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n  padding: 2rem;\n  font-family: "Poppins", sans-serif;\n  gap: 5rem;\n}\n.content-card {\n  display: flex;\n  align-items: center;\n  gap: 2rem;\n  background:\n    linear-gradient(\n      135deg,\n      #13072e,\n      #3f2182);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  padding: 3rem 4rem;\n  border-radius: 24px;\n  max-width: 1300px;\n  min-height: 700px;\n  width: 100%;\n  color: white;\n}\n.text-content {\n  flex: 1;\n}\n.text-content h1 {\n  font-size: 3rem;\n  font-weight: 700;\n  margin-bottom: 1rem;\n}\n.text-content p {\n  font-size: 1.1rem;\n  line-height: 1.6;\n  max-width: 500px;\n  margin-bottom: 2.5rem;\n  color: #dcdcdc;\n}\n.cta-button {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  background-color: white;\n  color: #333;\n  border: none;\n  padding: 1rem 2rem;\n  border-radius: 999px;\n  font-size: 1rem;\n  font-weight: 500;\n  cursor: pointer;\n  transition: transform 0.2s ease;\n}\n.cta-button:hover {\n  transform: scale(1.05);\n}\n.image-content {\n  flex: 1;\n  max-width: 500px;\n}\n.image-content img {\n  width: 100%;\n  height: auto;\n  border-radius: 16px;\n  clip-path: polygon(25% 0, 100% 0, 100% 100%, 0% 100%);\n}\n.events-section {\n  max-width: 1200px;\n  width: 100%;\n  text-align: center;\n  color: white;\n}\n.section-title {\n  font-size: 2.5rem;\n  font-weight: 700;\n  margin-bottom: 3rem;\n}\n.events-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));\n  gap: 2rem;\n  text-align: left;\n}\n.event-card {\n  background:\n    linear-gradient(\n      135deg,\n      #3f2182,\n      #13072e);\n  border-radius: 16px;\n  overflow: hidden;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);\n  transition: transform 0.3s ease;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n}\n.event-card:hover {\n  transform: translateY(-10px);\n}\n.event-image {\n  width: 100%;\n  height: 200px;\n  object-fit: cover;\n}\n.event-info {\n  padding: 1.5rem;\n}\n.event-title {\n  font-size: 1.5rem;\n  font-weight: 600;\n  margin: 0 0 0.5rem 0;\n}\n.event-date {\n  font-size: 0.9rem;\n  color: #dcdcdc;\n  margin-bottom: 1rem;\n}\n.event-description {\n  font-size: 1rem;\n  color: #dcdcdc;\n  line-height: 1.6;\n}\n/*# sourceMappingURL=home.css.map */\n';
  }
});

// src/app/pages/home/home.ts
var Home;
var init_home3 = __esm({
  "src/app/pages/home/home.ts"() {
    "use strict";
    init_tslib_es6();
    init_home();
    init_home2();
    init_core();
    init_router();
    Home = class Home2 {
    };
    Home = __decorate([
      Component({
        selector: "app-home",
        standalone: true,
        imports: [
          RouterLink
        ],
        template: home_default,
        styles: [home_default2]
      })
    ], Home);
  }
});

// src/app/pages/home/home.spec.ts
var require_home_spec = __commonJS({
  "src/app/pages/home/home.spec.ts"(exports) {
    init_testing();
    init_home3();
    describe("Home", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [Home]
        }).compileComponents();
        fixture = TestBed.createComponent(Home);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_home_spec();
//# sourceMappingURL=spec-app-pages-home-home.spec.js.map

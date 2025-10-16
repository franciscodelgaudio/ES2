<#import "template.ftl" as layout>
<#import "user-profile-commons.ftl" as userProfileCommons>
<#import "register-commons.ftl" as registerCommons>

<@layout.registrationLayout displayMessage=messagesPerField.exists('global') displayRequiredFields=false; section>

  <#if section = "header">
    <#-- removido de propósito: sem cabeçalho -->
  <#elseif section = "form">

    <div class="login-container page-register">
      <div class="login-box">
        <h1>Cadastro</h1>
        <p class="subtitle">* Campos obrigatórios</p>

        <form id="kc-register-form" class="${properties.kcFormClass!}" action="${url.registrationAction}" method="post">

          <@userProfileCommons.userProfileFormFields; callback, attribute>
            <#if callback = "afterField">
              <#-- Senha + Confirmação logo abaixo de email/username -->
              <#if passwordRequired?? && (attribute.name == 'username' || (attribute.name == 'email' && realm.registrationEmailAsUsername))>
                <div class="form-group">
                  <label for="password" class="${properties.kcLabelClass!}">${msg("password")}</label>
                  <div class="${properties.kcInputGroup!} pw-group" dir="ltr">
                    <input type="password" id="password" class="${properties.kcInputClass!}" name="password"
                           placeholder="******"
                           autocomplete="new-password"
                           aria-invalid="<#if messagesPerField.existsError('password','password-confirm')>true</#if>" />
                    <button class="${properties.kcFormPasswordVisibilityButtonClass!}" type="button" aria-label="${msg('showPassword')}"
                            aria-controls="password" data-password-toggle
                            data-icon-show="${properties.kcFormPasswordVisibilityIconShow!}" data-icon-hide="${properties.kcFormPasswordVisibilityIconHide!}"
                            data-label-show="${msg('showPassword')}" data-label-hide="${msg('hidePassword')}">
                      <i class="${properties.kcFormPasswordVisibilityIconShow!}" aria-hidden="true"></i>
                    </button>
                  </div>
                  <#if messagesPerField.existsError('password')>
                    <span id="input-error-password" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                      ${kcSanitize(messagesPerField.get('password'))?no_esc}
                    </span>
                  </#if>
                </div>

                <div class="form-group">
                  <label for="password-confirm" class="${properties.kcLabelClass!}">${msg("passwordConfirm")}</label>
                  <div class="pw-group ${properties.kcInputGroup!}" dir="ltr">
                    <input type="password" id="password-confirm" class="${properties.kcInputClass!}"
                           name="password-confirm" placeholder="******"
                           autocomplete="new-password"
                           aria-invalid="<#if messagesPerField.existsError('password-confirm')>true</#if>" />
                    <button class="${properties.kcFormPasswordVisibilityButtonClass!}" type="button" aria-label="${msg('showPassword')}"
                            aria-controls="password-confirm" data-password-toggle
                            data-icon-show="${properties.kcFormPasswordVisibilityIconShow!}" data-icon-hide="${properties.kcFormPasswordVisibilityIconHide!}"
                            data-label-show="${msg('showPassword')}" data-label-hide="${msg('hidePassword')}">
                      <i class="${properties.kcFormPasswordVisibilityIconShow!}" aria-hidden="true"></i>
                    </button>
                  </div>
                  <#if messagesPerField.existsError('password-confirm')>
                    <span id="input-error-password-confirm" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                      ${kcSanitize(messagesPerField.get('password-confirm'))?no_esc}
                    </span>
                  </#if>
                </div>
              </#if>
            </#if>
          </@userProfileCommons.userProfileFormFields>

          <@registerCommons.termsAcceptance/>

          <#if recaptchaRequired?? && (recaptchaVisible!false)>
            <div class="form-group">
              <div class="${properties.kcInputWrapperClass!}">
                <div class="g-recaptcha" data-size="compact" data-sitekey="${recaptchaSiteKey}" data-action="${recaptchaAction}"></div>
              </div>
            </div>
          </#if>

          <div class="form-group">
            <div id="kc-form-options">
              <div class="${properties.kcFormOptionsWrapperClass!}">
                <span><a href="${url.loginUrl}">${kcSanitize(msg("backToLogin"))?no_esc}</a></span>
              </div>
            </div>

            <div id="kc-form-buttons" class="${properties.kcFormButtonsClass!}">
              <button class="btn-login ${properties.kcButtonClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}"
                      type="submit">${msg("doRegister")}</button>
            </div>
          </div>
        </form>

        <script type="module" src="${url.resourcesPath}/js/passwordVisibility.js"></script>
      </div>
    </div>

  </#if>
</@layout.registrationLayout>

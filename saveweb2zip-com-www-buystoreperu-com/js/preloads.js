
    (function() {
      var preconnectOrigins = ["https://cdn.shopify.com"];
      var scripts = ["/cdn/shopifycloud/checkout-web/assets/c1/polyfills.C7jITNoQ.js","/cdn/shopifycloud/checkout-web/assets/c1/app.BBtzh281.js","/cdn/shopifycloud/checkout-web/assets/c1/esnext-vendor.BIvPVH_X.js","/cdn/shopifycloud/checkout-web/assets/c1/context-browser.VJ_p3K1L.js","/cdn/shopifycloud/checkout-web/assets/c1/types-UnauthenticatedErrorModalPayload.D93yVMVz.js","/cdn/shopifycloud/checkout-web/assets/c1/receipt-mapper-load-recovery.CRYC9uBr.js","/cdn/shopifycloud/checkout-web/assets/c1/receipt-eager-mappers.BiRx7PDJ.js","/cdn/shopifycloud/checkout-web/assets/c1/NotFound.CRC5yvVJ.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useHasOrdersFromMultipleShops.CXmUIhkp.js","/cdn/shopifycloud/checkout-web/assets/c1/hydrate.Cm1HhXNb.js","/cdn/shopifycloud/checkout-web/assets/c1/utilities-browser.CcKThsAL.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useShopPayExternalAppContext.BCiXn3PY.js","/cdn/shopifycloud/checkout-web/assets/c1/helpers-installmentsNotSupportedForAddress.f8Qvml4Q.js","/cdn/shopifycloud/checkout-web/assets/c1/shop-pay-normalizeBuyerDetails.C24uwG1l.js","/cdn/shopifycloud/checkout-web/assets/c1/utilities-shop-pay-alternative-payment-flow.CVWjR8r_.js","/cdn/shopifycloud/checkout-web/assets/c1/helpers-paymentMethodFromPaymentLines.DEz87UVa.js","/cdn/shopifycloud/checkout-web/assets/c1/helpers-getNormalizedPaymentMethodName.iy2ydpu0.js","/cdn/shopifycloud/checkout-web/assets/c1/graphql-UserPrivacySettingsSetMutation.CtybCrF0.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useShopPayCheckoutGqlVersion.CGavq9cW.js","/cdn/shopifycloud/checkout-web/assets/c1/extensions-rpc.DGj-Zbp1.js","/cdn/shopifycloud/checkout-web/assets/c1/graphql-PaymentSessionMutation.BMQ3Teoz.js","/cdn/shopifycloud/checkout-web/assets/c1/locale-es.Bejkl98Z.js","/cdn/shopifycloud/checkout-web/assets/c1/OnePage.DKa9oBdm.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useWalletsTimeout.CsfhhwqD.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-usePostPurchase.BL1zCVgg.js","/cdn/shopifycloud/checkout-web/assets/c1/components-DeliveryTransition.BBUMexNR.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useUnauthenticatedErrorModal.DPVZVsdN.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useSuppressShopPayModalOnLoad.D_h2p8JE.js","/cdn/shopifycloud/checkout-web/assets/c1/AddressPresenter.CtIv0FE6.js","/cdn/shopifycloud/checkout-web/assets/c1/ChangeCompanyLocationLink.BsTf4813.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useStableHostMethodsReferences.DkrzOTbd.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useSandboxTelemetry.CxVMVs3r.js","/cdn/shopifycloud/checkout-web/assets/c1/BillingAddressForm.CM6Dfmpy.js","/cdn/shopifycloud/checkout-web/assets/c1/PhoneField.CTANzAo3.js","/cdn/shopifycloud/checkout-web/assets/c1/ImpressionEventCapture.DPSOxBJO.js","/cdn/shopifycloud/checkout-web/assets/c1/EmptyState.BFAwY13_.js","/cdn/shopifycloud/checkout-web/assets/c1/Choice.BERuDzce.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-usePickupPoints.DDuHpfis.js","/cdn/shopifycloud/checkout-web/assets/c1/utilities-bankPaymentMethodBrandKeys.Co-1IfN1.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useForceShopPayUrl.CYoi29Be.js","/cdn/shopifycloud/checkout-web/assets/c1/ShopPayLogo.BqYMjqDw.js","/cdn/shopifycloud/checkout-web/assets/c1/Monorail-monorailMetric-wallets.D--BSowQ.js","/cdn/shopifycloud/checkout-web/assets/c1/cross-border-hooks.Bm1EKHf1.js","/cdn/shopifycloud/checkout-web/assets/c1/NoAddressLocationFullDetour.DTT7Ljkl.js","/cdn/shopifycloud/checkout-web/assets/c1/OffsitePaymentFailed.BVKkKLsk.js","/cdn/shopifycloud/checkout-web/assets/c1/AutocompleteField-hooks.vJNNStJN.js","/cdn/shopifycloud/checkout-web/assets/c1/PendingShipping.BNGRjRD8.js","/cdn/shopifycloud/checkout-web/assets/c1/StoreCreditRedemption-StoreCreditRedemptionErrorBanner.CcpBd5yg.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentIcon.BW1AMbTE.js","/cdn/shopifycloud/checkout-web/assets/c1/shop-cash-context.B093AaM8.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useGeneralPaymentErrorMessage.8LzZDvrT.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentLine.BUSqrPD0.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useShopPayProgressIntercepts.BXBQgG6f.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useShowShopPayOptin.BRdouxDy.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useUpdateCheckoutAddress.Chz6mU2G.js","/cdn/shopifycloud/checkout-web/assets/c1/Section.BNG3KzlZ.js","/cdn/shopifycloud/checkout-web/assets/c1/remember-me-hooks.DPl67BqH.js","/cdn/shopifycloud/checkout-web/assets/c1/useShopPaySessionTokenStorage.U1Rc3yA2.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useOnePageFormSubmit.C34iWo_s.js","/cdn/shopifycloud/checkout-web/assets/c1/captcha-hooks.CWwt2ALr.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-payment-button.CeXx59yz.js","/cdn/shopifycloud/checkout-web/assets/c1/shop-cash-monorail.BZYt1Mm8.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useAvailableShopPromotionDiscount.VS3JCNyH.js","/cdn/shopifycloud/checkout-web/assets/c1/BillingAddressSelector.D6inI4eB.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentErrorBanner.DuqUNs2Q.js","/cdn/shopifycloud/checkout-web/assets/c1/Switch.Dnws5X8z.js","/cdn/shopifycloud/checkout-web/assets/c1/shipping-rates-progressiveShippingRatesLoading.xa9rWapi.js","/cdn/shopifycloud/checkout-web/assets/c1/ShipmentBreakdown.DWtThjNF.js","/cdn/shopifycloud/checkout-web/assets/c1/MerchandiseModal.CXpdVmbM.js","/cdn/shopifycloud/checkout-web/assets/c1/extension-targets-shipping-options.BHXGD77p.js","/cdn/shopifycloud/checkout-web/assets/c1/EstimatedDeliveryContent.SI7c-tNG.js","/cdn/shopifycloud/checkout-web/assets/c1/ShippingMethodRateLabel.Bbotfreb.js","/cdn/shopifycloud/checkout-web/assets/c1/ShippingMethodSelector.df372KDc.js","/cdn/shopifycloud/checkout-web/assets/c1/TextArea.xmDbWfjC.js","/cdn/shopifycloud/checkout-web/assets/c1/SubscriptionPriceBreakdown.Do8jF8yi.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-usePaypalRowEffects.C9ElsZog.js","/cdn/shopifycloud/checkout-web/assets/c1/Middot.DU-jzbVe.js","/cdn/shopifycloud/checkout-web/assets/c1/shipping-methods-consolidated-included.C0lXKLMF.js","/cdn/shopifycloud/checkout-web/assets/c1/StockProblems-StockProblemsLineItemList.DHmt6jVh.js"];
      var styles = ["/cdn/shopifycloud/checkout-web/assets/c1/assets/app.DD4EuVt9.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/UnauthenticatedErrorModalPayload.BhgMDl0B.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/useHasOrdersFromMultipleShops.B_iZlQze.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/stopwatch.DrvYhoar.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/OnePage.RWWzwUS2.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/DeliveryTransition.CXbHQpsO.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/StoreCreditRedemptionErrorBanner.D9V9v-Ux.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/NoAddressLocationFullDetour.D14orovx.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/useShopPaySessionTokenStorage.CqVkJv9Z.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/useOnePageFormSubmit.CS-PIQ3P.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/useShopPayProgressIntercepts.CIy8uDiZ.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/Choice.BqZ675YI.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/EmptyState.BEvzDDvy.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/ChangeCompanyLocationLink.uqpm88mq.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/Section.CU18S7Ap.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/PaymentLine.7870thps.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/Switch.Dq_6Ius6.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/PaymentIcon.CLVwzp6i.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/progressiveShippingRatesLoading.LcqrKXE1.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/useUnauthenticatedErrorModal.CpHF4L7Q.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/BillingAddressForm.BdwN7V1K.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/PhoneField.uZEuHncj.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/Middot.D7Ujmshx.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/MerchandiseModal.D6OuIVjc.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/EstimatedDeliveryContent.CGkrPwWj.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/hooks.dFPtnh-r.css"];
      var fontPreconnectUrls = [];
      var fontPrefetchUrls = [];
      var imgPrefetchUrls = [];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = preconnectOrigins.concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res, next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        function run() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        }
        var next = (self.requestIdleCallback || setTimeout).bind(self, run);
        next();
      }

      function onLoaded() {
        try {
          if (parseFloat(navigator.connection.effectiveType) > 2 && !navigator.connection.saveData) {
            preconnectAssets();
            prefetchAssets();
          }
        } catch (e) {}
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  
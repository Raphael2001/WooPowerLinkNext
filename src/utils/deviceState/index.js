import Store from "redux/index";
import Actions from "redux/actions";

const DeviceState = (function () {
  const delay = 250;
  let debounceTimer;

  function init() {
    setDevices();
    const deviceDebounce = () => {
      debounce(setDevices, delay);
    };

    window.addEventListener("resize", deviceDebounce);
  }

  function setDevices() {
    const devices = getScreenBasedOnMediaQuery();
    Store.dispatch(Actions.setDeviceState(devices));
  }

  function debounce(callback, time) {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(callback, time);
  }

  function getScreenBasedOnMediaQuery() {
    const mobile = window.matchMedia("(max-width:767px)").matches;
    const tablet = window.matchMedia(
      "(min-width:768px) and (max-width:1199px)"
    ).matches;
    const desktop = window.matchMedia(
      "(min-width:1200px) and (max-width:1499px)"
    ).matches;
    const desktopLarge = window.matchMedia(
      "(min-width:1500px) and (max-width:1919px)"
    ).matches;
    const desktopMax = window.matchMedia("(min-width:1920px").matches;

    return {
      isMobile: mobile,
      isTablet: tablet,
      isLaptop: desktop,
      isDesktopLarge: desktopLarge,
      isDesktopMax: desktopMax,
      isDesktop: desktop || desktopLarge || desktopMax,
      notDesktop: !desktop && !desktopLarge && !desktopMax,
      notMobile: !mobile,
    };
  }

  return { init };
})();

export default DeviceState;

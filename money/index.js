/**
 * @author Hervé Guétin <www.linkedin.com/in/herveguetin>
 */
export default {
  formatPrice(amount, { locale = Zermatt.Variables.locale, currency = Zermatt.Variables.currency.code } = {}) {
    const formatLang = locale.replace("_", "-");
    return new Intl.NumberFormat(formatLang, {
      style: "currency",
      currency: currency,
    }).format(amount);
  },
};

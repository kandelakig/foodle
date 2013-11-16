define(['jquery', 'lib/mustache', 'azure', 'lib/underscore'], function($, Mustache) {
  M = Mustache
  // TODO: do not pollute global scope!
  client = new WindowsAzure.MobileServiceClient(
    "https://ffu.azure-mobile.net/",
    "NOBNKTNLVHWotAPMiQXICsknJeXZjB81"
  )
})
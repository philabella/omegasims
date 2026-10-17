// libm pow() for Node: Chromium 141's Math.pow is the system libm pow (glibc), Node 22's is fdlibm.
// Build: gcc -O2 -shared -fPIC -I<node>/include/node libmpow.c -o libmpow.node -lm   (fastsim/native/build.sh)
#include <node_api.h>
#include <math.h>

static napi_value Pow(napi_env env, napi_callback_info info) {
  size_t argc = 2; napi_value argv[2]; double x = NAN, y = NAN; napi_value out;
  napi_get_cb_info(env, info, &argc, argv, NULL, NULL);
  if (argc > 0) napi_get_value_double(env, argv[0], &x);
  if (argc > 1) napi_get_value_double(env, argv[1], &y);
  napi_create_double(env, pow(x, y), &out);
  return out;
}
static napi_value Init(napi_env env, napi_value exports) {
  napi_value fn;
  napi_create_function(env, "pow", NAPI_AUTO_LENGTH, Pow, NULL, &fn);
  napi_set_named_property(env, exports, "pow", fn);
  return exports;
}
NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)

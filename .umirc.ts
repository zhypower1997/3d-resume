import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
  chainWebpack: (config) => {
    config.module
      .rule('fbx')
      .test(/\.(fbx|obj|gltf|glb|mtl)$/)
      .use('url-loader')
      .loader('url-loader')
      .options({})
      .end();
  },
});

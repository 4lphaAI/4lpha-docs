import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
// Optional build-only toolchain locations avoid downloading packages already installed locally.
const bundlerRoot=process.argv[2] || root;
const reactRoot=process.argv[3] || root;
const require=createRequire(path.join(bundlerRoot,'package.json'));
const esbuild=require('esbuild');
const result=await esbuild.build({
 entryPoints:[path.join(root,'explainer-src/entry.js')],
 bundle:true,write:false,platform:'browser',format:'iife',minify:true,legalComments:'inline',
 nodePaths:[path.join(reactRoot,'node_modules')],
 define:{'process.env.NODE_ENV':'"production"'}
});
const css=fs.readFileSync(path.join(root,'explainer-src/reading.css'),'utf8');
const bundle=result.outputFiles[0].text.replace(/<\/script/gi,'<\\/script');
const file=path.join(root,'index.html');
let html=fs.readFileSync(file,'utf8');
html=html.replace(/<style id="docs-reading">[\s\S]*?<\/style>/,()=>'<style id="docs-reading">'+css+'</style>');
html=html.replace(/<script id="marketplace-explainers">[\s\S]*?<\/script>/,()=>'<script id="marketplace-explainers">'+bundle+'</script>');
fs.writeFileSync(file,html);
console.log('Built standalone docs: '+Buffer.byteLength(html)+' bytes.');

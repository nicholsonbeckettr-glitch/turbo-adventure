const $=id=>document.getElementById(id);
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const Admin={
  async load(){
    $('msg').textContent='读取中...';
    sessionStorage.setItem('admin-token',$('token').value);
    try{
      const res=await fetch('/api/admin',{headers:{authorization:`Bearer ${$('token').value}`}});
      if(!res.ok){$('msg').textContent='验证失败或后台未配置完成';return;}
      const data=await res.json();
      this.render(data);
    }catch(e){
      $('msg').textContent='网络错误，稍后重试';
    }
  },

  render(data){
    $('dashboard').classList.remove('is-hidden');
    $('msg').textContent='已更新';
    $('users').textContent=data.users||0;
    $('events').textContent=data.events||0;
    $('results').textContent=data.byEvent?.result||0;
    $('copies').textContent=data.byEvent?.copy_report||0;
    $('downloads').textContent=data.byEvent?.download_report||0;
    $('supplements').innerHTML=this.rank(data.supplements);
    $('targets').innerHTML=this.rank(data.targets);
    $('recent').innerHTML=(data.recent||[]).map(item=>`
      <tr>
        <td>${esc(item.ts)}</td>
        <td>${esc(item.event)}</td>
        <td>${esc(item.path)}</td>
        <td>${esc([...(item.supplements||[]),...(item.targets||[])].join('、'))}</td>
      </tr>
    `).join('');
  },

  rank(items={}){
    const rows=Object.entries(items).sort((a,b)=>b[1]-a[1]).slice(0,10);
    const max=Math.max(...rows.map(([,v])=>v),1);
    return rows.map(([name,value])=>`
      <div class="rank-row">
        <div class="rank-head"><span>${esc(name)}</span><strong>${esc(value)}</strong></div>
        <div class="bar"><div class="fill" style="--bar-width:${Math.round(value/max*100)}%"></div></div>
      </div>
    `).join('')||'<p class="muted">暂无数据</p>';
  },
};

$('token').value=sessionStorage.getItem('admin-token')||'';
$('load-stats').addEventListener('click',()=>Admin.load());
window.Admin=Admin;

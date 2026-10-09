/* ==========================================================================
   Auth & Admin User Permission Management
   ========================================================================== */

import { store } from './store.js';
import { t } from './i18n.js';

export function renderAuthModal(onLoginSuccess) {
  let modal = document.getElementById('authModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'authModal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }

  const users = store.getUsers();

  modal.innerHTML = `
    <div class="glass-panel modal-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
        <h2 style="font-size:22px;font-weight:800">${t('loginTitle')}</h2>
        <button class="btn btn-ghost btn-sm" id="closeAuthBtn">✕</button>
      </div>
      <p style="color:var(--text-muted);font-size:13px;margin-bottom:20px">${t('loginSubtitle')}</p>
      
      <!-- Quick Demo Switcher -->
      <div class="form-group" style="background:rgba(99,102,241,0.1);padding:14px;border-radius:12px;border:1px solid rgba(99,102,241,0.25)">
        <label style="color:#a5b4fc">${t('quickDemoUser')}</label>
        <select class="form-select" id="demoUserSelect">
          <option value="">-- Choose Account to Quick Sign In --</option>
          ${users.map(u => `
            <option value="${u.id}">${u.avatar} ${u.name} (${u.email}) [Perms: ${u.permissions.join(', ')}]</option>
          `).join('')}
        </select>
      </div>

      <form id="loginForm">
        <div class="form-group">
          <label>${t('emailLabel')}</label>
          <input type="email" id="loginEmail" class="form-input" value="yqcw@qq.com" required placeholder="yqcw@qq.com">
        </div>
        <div class="form-group">
          <label>${t('passwordLabel')}</label>
          <input type="password" id="loginPass" class="form-input" value="123456" required>
        </div>
        <div id="loginError" style="color:var(--danger);font-size:13px;margin-bottom:14px;display:none"></div>
        <button type="submit" class="btn btn-primary" style="width:100%">${t('loginSubmit')}</button>
      </form>
    </div>
  `;

  modal.classList.add('active');

  document.getElementById('closeAuthBtn').onclick = () => modal.classList.remove('active');

  document.getElementById('demoUserSelect').onchange = (e) => {
    const selectedId = e.target.value;
    if (selectedId) {
      store.setCurrentUser(selectedId);
      modal.classList.remove('active');
      if (onLoginSuccess) onLoginSuccess();
    }
  };

  document.getElementById('loginForm').onsubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const pass = document.getElementById('loginPass').value;
    const res = store.login(email, pass);
    if (res.success) {
      modal.classList.remove('active');
      if (onLoginSuccess) onLoginSuccess();
    } else {
      const errEl = document.getElementById('loginError');
      errEl.textContent = t('invalidAuth');
      errEl.style.display = 'block';
    }
  };
}

export function renderAdminConsole(onUpdate) {
  let modal = document.getElementById('adminModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'adminModal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }

  const users = store.getUsers();

  modal.innerHTML = `
    <div class="glass-panel modal-box" style="width:min(100%, 820px)">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
        <div>
          <h2 style="font-size:22px;font-weight:800">${t('adminTitle')}</h2>
          <p style="color:var(--text-muted);font-size:13px">Default Admin: yqcw@qq.com (Full Control)</p>
        </div>
        <button class="btn btn-ghost btn-sm" id="closeAdminBtn">✕</button>
      </div>

      <div style="display:flex;justify-content:flex-end;margin-bottom:16px">
        <button class="btn btn-secondary btn-sm" id="addNewUserBtn">${t('addUserBtn')}</button>
      </div>

      <div style="overflow-x:auto">
        <table class="data-table">
          <thead>
            <tr>
              <th>${t('colName')}</th>
              <th>${t('colEmail')}</th>
              <th>${t('colRole')}</th>
              <th>${t('colPerms')}</th>
              <th>${t('colActions')}</th>
            </tr>
          </thead>
          <tbody>
            ${users.map(u => `
              <tr>
                <td>
                  <div style="display:flex;align-items:center;gap:8px">
                    <span>${u.avatar || '👤'}</span>
                    <strong style="color:var(--text-main)">${u.name}</strong>
                  </div>
                </td>
                <td><code>${u.email}</code></td>
                <td><span class="tag-pill" style="${u.role==='admin'?'color:var(--secondary);border-color:var(--secondary)':''}">${u.role}</span></td>
                <td>
                  <div style="display:flex;gap:4px">
                    ${['A', 'B', 'C'].map(p => `
                      <span class="tag-pill" style="${u.permissions.includes(p)?'background:var(--primary-light);color:#a5b4fc;border-color:var(--primary)':''}">
                        Option ${p}
                      </span>
                    `).join('')}
                  </div>
                </td>
                <td>
                  <button class="btn btn-ghost btn-sm edit-user-btn" data-id="${u.id}">${t('edit')}</button>
                  ${u.id !== 'u1' ? `<button class="btn btn-danger btn-sm del-user-btn" data-id="${u.id}">${t('delete')}</button>` : ''}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  modal.classList.add('active');

  document.getElementById('closeAdminBtn').onclick = () => modal.classList.remove('active');

  document.getElementById('addNewUserBtn').onclick = () => {
    renderUserEditModal(null, () => {
      renderAdminConsole(onUpdate);
      if (onUpdate) onUpdate();
    });
  };

  modal.querySelectorAll('.edit-user-btn').forEach(btn => {
    btn.onclick = () => {
      const uId = btn.dataset.id;
      const userObj = users.find(u => u.id === uId);
      renderUserEditModal(userObj, () => {
        renderAdminConsole(onUpdate);
        if (onUpdate) onUpdate();
      });
    };
  });

  modal.querySelectorAll('.del-user-btn').forEach(btn => {
    btn.onclick = () => {
      if (confirm(`Delete user ${btn.dataset.id}?`)) {
        store.deleteUser(btn.dataset.id);
        renderAdminConsole(onUpdate);
        if (onUpdate) onUpdate();
      }
    };
  });
}

function renderUserEditModal(userObj, onSaved) {
  let modal = document.getElementById('userEditModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'userEditModal';
    modal.className = 'modal-overlay';
    modal.style.zIndex = '2100';
    document.body.appendChild(modal);
  }

  const isEdit = !!userObj;
  const perms = userObj ? userObj.permissions : ['A', 'B'];

  modal.innerHTML = `
    <div class="glass-panel modal-box">
      <h3 style="font-size:18px;font-weight:800;margin-bottom:20px">${t('modalUserTitle')}</h3>
      <form id="userEditForm">
        <div class="form-group">
          <label>${t('colName')}</label>
          <input type="text" id="editName" class="form-input" value="${isEdit ? userObj.name : ''}" required placeholder="Name">
        </div>
        <div class="form-group">
          <label>${t('colEmail')}</label>
          <input type="email" id="editEmail" class="form-input" value="${isEdit ? userObj.email : ''}" required placeholder="user@company.com">
        </div>
        <div class="form-group">
          <label>${t('passwordLabel')}</label>
          <input type="text" id="editPassword" class="form-input" value="${isEdit ? userObj.password : '123456'}" required>
        </div>

        <div class="form-group">
          <label>${t('colPerms')}</label>
          <div class="perm-options">
            <label class="perm-checkbox">
              <input type="checkbox" name="perm" value="A" ${perms.includes('A') ? 'checked' : ''}>
              <span>Option A (Grouping)</span>
            </label>
            <label class="perm-checkbox">
              <input type="checkbox" name="perm" value="B" ${perms.includes('B') ? 'checked' : ''}>
              <span>Option B (Game Match)</span>
            </label>
            <label class="perm-checkbox">
              <input type="checkbox" name="perm" value="C" ${perms.includes('C') ? 'checked' : ''}>
              <span>Option C (Carpool)</span>
            </label>
          </div>
        </div>

        <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:24px">
          <button type="button" class="btn btn-ghost" id="cancelEditUser">Cancel</button>
          <button type="submit" class="btn btn-primary">${t('saveUserBtn')}</button>
        </div>
      </form>
    </div>
  `;

  modal.classList.add('active');

  document.getElementById('cancelEditUser').onclick = () => modal.classList.remove('active');

  document.getElementById('userEditForm').onsubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById('editName').value;
    const email = document.getElementById('editEmail').value;
    const password = document.getElementById('editPassword').value;
    const checkedPerms = Array.from(modal.querySelectorAll('input[name="perm"]:checked')).map(el => el.value);

    if (isEdit) {
      store.updateUser({
        id: userObj.id,
        name,
        email,
        password,
        permissions: checkedPerms
      });
    } else {
      store.addUser({
        name,
        email,
        password,
        permissions: checkedPerms
      });
    }

    modal.classList.remove('active');
    if (onSaved) onSaved();
  };
}

import React from 'react'

export default function ConfirmModal({ open, title, message, onConfirm, onCancel }){
  if(!open) return null
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{title || 'Confirm'}</h3>
        </div>
        <div style={{marginBottom:12}}>{message}</div>
        <div style={{display:'flex', gap:8, justifyContent:'flex-end'}}>
          <button className="btn ghost" onClick={onCancel}>Cancel</button>
          <button className="btn danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  )
}

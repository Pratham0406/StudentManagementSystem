import React from 'react'

export default function Toasts({ toasts, onRemove }){
  return (
    <div className="toast-wrap">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`toast ${t.type || 'info'}`}
          onClick={()=>onRemove(t.id)}
        >
          <div className="toast-message">{t.message}</div>
          <div className="toast-close">✕</div>
        </div>
      ))}
    </div>
  )
}

export default function Tooltip({ text, tail = 'down-left', onDismiss }) {
  return (
    <div className={`coach-tip coach-tip-${tail}`}>
      <span className="coach-tip-text">{text}</span>
      <button className="coach-tip-dismiss" onClick={onDismiss}>Got it</button>
    </div>
  )
}

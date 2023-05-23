import React, { memo } from 'react'
import './CommitHash.scss'

const commitHash = process.env.REACT_APP_COMMIT_HASH ?? null

const CommitHash = () =>
  commitHash ? <span className="commit-hash">{`#${commitHash}`}</span> : null

export default memo(CommitHash)

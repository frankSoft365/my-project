import { useState } from 'react';

export default function Comment() {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const numOfComments = comments.length;
    return (
        <div>
            <div className="current-state-bar">
                <div>
                    评论{numOfComments}
                </div>
                <div>
                    <button>
                        最热
                    </button>
                    {' | '}
                    <button>
                        最新
                    </button>
                </div>
            </div>
            <div className="comment-bar">
                <img src="#" />
                <input type='text' placeholder='这里需要一条查重率0%的评论' value={comment} onChange={e => setComment(e.target.value)} />
            </div>
        </div>
    );
}
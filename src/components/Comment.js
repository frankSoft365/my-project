import { useState } from 'react';
import { getDateTime } from '../utils/getDateTime';

export default function Comment() {
    const [user, setUser] = useState({ id: '230522512', name: 'frank', image: '../assets/skirk.jpg' });
    const [comment, setComment] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [comments, setComments] = useState([]);
    const numOfComments = comments.length;
    function handleCommit() {
        if (comment.length === 0) {
            console.log('no commet, return')
            return;
        }
        console.log(getDateTime() + user.id + 'is commited');
        setComments([
            ...comments,
            {
                id: getDateTime() + '' + user.id,
                commetTime: getDateTime().slice(0, 16),
                commentContent: comment,
                commentUser: user,
                commentLike: 0,
            }
        ]);
        setComment('');
    }
    function handleDelete(id) {
        setComments(comments.filter(comment => comment.id !== id));
    }
    function handleSelect(e) {
        const userName = e.target.value;
        let user;
        switch (userName) {
            case 'frank': {
                user = {
                    id: '230522512',
                    name: 'frank',
                    image: '../assets/skirk.jpg'
                };
                break;
            }
            case 'tom': {
                user = {
                    id: '230522513',
                    name: 'tom',
                    image: '../assets/ayaka.jpg'
                };
                break;
            }
            case 'jane':
                user = {
                    id: '230522514',
                    name: 'jane',
                    image: '../assets/fireflyEye.jpg'
                };
                break;
        }
        setUser(user);
    }
    return (
        <div>
            <div className='select-user'>
                <select onChange={e => handleSelect(e)}>
                    <option value='farnk'>frank</option>
                    <option value='tom'>tom</option>
                    <option value='jane'>jane</option>
                </select>
            </div>
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
                <Profile user={user} />
                <input
                    type='text'
                    placeholder='这里需要一条查重率0%的评论'
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                {isFocused && <button onMouseDown={handleCommit}>发布</button>}
            </div>
            <div className='comments-list'>
                {comments.map((comment) => {
                    return (
                        <div className='comment' key={comment.id}>
                            <Profile user={comment.commentUser} />
                            <div>{comment.commentUser.name}</div>
                            <div>{comment.commentContent}</div>
                            <div className='time-like-delete'>
                                <div>{comment.commetTime}</div>
                                <div>{comment.commentLike}</div>
                                <div>{comment.commentUser === user && <button onClick={() => handleDelete(comment.id)}>删除</button>}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function Profile({ user }) {
    return (
        <div className='profile'>
            <img src={user.image} />
        </div>
    );
}
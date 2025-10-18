import { useState } from 'react';
import { getDateTime } from '../utils/getDateTime';
import './comment.css';
import skirkImg from '../assets/skirk.jpg';
import ayakaImg from '../assets/ayaka.jpg';
import fireflyEyeImg from '../assets/fireflyEye.jpg';

export default function Comment() {
    const [user, setUser] = useState({ id: '230522512', name: 'frank', image: skirkImg });
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
                id: getDateTime() + ' ' + user.id,
                commetTime: getDateTime().slice(0, 16),
                commentContent: comment,
                commentUser: {
                    id: user.id,
                    name: user.name,
                    image: user.image
                },
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
            case 'frank':
                user = {
                    id: '230522512',
                    name: 'frank',
                    image: skirkImg
                };
                break;
            case 'tom':
                user = {
                    id: '230522513',
                    name: 'tom',
                    image: ayakaImg
                };
                break;
            case 'jane':
                user = {
                    id: '230522514',
                    name: 'jane',
                    image: fireflyEyeImg
                };
                break;
            default:
                user = {
                    id: '230522512',
                    name: 'frank',
                    image: skirkImg
                };
        }
        setUser(user);
    }
    function handleLike(id) {
        setComments(comments.map((comment) => {
            if (comment.id !== id) {
                return comment;
            }
            return ({
                ...comment,
                commentLike: comment.commentLike + 1
            });
        }));
    }
    return (
        <div className='comment-component'>
            <div className='select-user-dropdown'>
                <select onChange={e => handleSelect(e)}>
                    <option value='frank'>frank</option>
                    <option value='tom'>tom</option>
                    <option value='jane'>jane</option>
                </select>
            </div>
            <div className="current-state-bar">
                <div className='text-and-num-of-comments'>
                    <div className='text'>评论</div>
                    <div className='num-of-comments'>{numOfComments}</div>
                </div>
                <div className='hot-and-last-btn'>
                    <button>
                        最热
                    </button>
                    {' | '}
                    <button>
                        最新
                    </button>
                </div>
            </div>
            <div className="comment-input-bar">
                <Profile user={user} />
                <div className='input-bar-btn'>
                    <input
                        className='input-bar'
                        name='comment'
                        type='text'
                        placeholder='这里需要一条查重率0%的评论'
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                    {isFocused && <button onMouseDown={handleCommit}>发布</button>}
                </div>
            </div>
            <div className='comments-list'>
                {comments.map((comment) => {
                    return (
                        <div className='comment' key={comment.id}>
                            <Profile user={comment.commentUser} />
                            <div className='name-content-time-like-delete'>
                                <div className='name'>{comment.commentUser.name}</div>
                                <p className='content'>{comment.commentContent}</p>
                                <div className='time-like-delete'>
                                    <div className='flex-item'>{comment.commetTime}</div>
                                    <div className='flex-item like-btn-and-num'>
                                        <button className='like-btn' onClick={() => handleLike(comment.id)}></button>
                                        <div>{comment.commentLike === 0 ? '' : comment.commentLike}</div>
                                    </div>
                                    <div className='flex-item'>{comment.commentUser.id === user.id && <button onClick={() => handleDelete(comment.id)}>删除</button>}</div>
                                </div>
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
            <img src={user.image} alt='icon' />
        </div>
    );
}
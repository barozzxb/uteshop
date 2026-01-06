"use client";
import React, { useEffect, useState } from "react";
import { getCommentsByProduct, addComment } from "@/services/commentService";
import { Comment } from "@/types/types";

export default function ProductComments({ productId}: { productId: string}) {
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");
    const fetchComments = async () => {
        const res = await getCommentsByProduct(productId);
        if (res.success) setComments(res.data);
    };
    useEffect(() => {
        fetchComments();
    }, [productId]);

    const handleAddComment = async () => {
        const token = localStorage.getItem("token");
        const userId = token ? JSON.parse(atob(token.split('.')[1])).userId : null;

        if (!content.trim()) return;
        const res = await addComment(productId, userId, content);
        if (res.success) {
            fetchComments();
            setContent("");
        }
    };

    return (
        <div className="mt-6">
            <h3 className="text-lg font-bold mb-2">Bình luận</h3>
            <div className="mb-4 flex gap-2">
                <input
                    type="text"
                    placeholder="Viết bình luận..."
                    className="flex-1 border px-2 py-1 rounded"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
                <button
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={handleAddComment}
                >
                    Gửi
                </button>
            </div>
            {comments.length === 0 ? (
                <p>Chưa có bình luận nào.</p>
            ) : (
                comments.map((c: Comment) => (
                    <div key={c._id} className="border-b py-2">
                        <p>{c.content}</p>
                        <span className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleString()}</span>
                    </div>
                ))
            )}
        </div>
    );
}

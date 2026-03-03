import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useAppContext } from '../conext/AppContext';

const ChatWidget = () => {
    const { axios, user } = useAppContext();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Xin chào! Tôi có thể giúp gì cho bạn về việc đặt phòng khách sạn?", sender: 'bot', time: new Date() }
    ]);
    const [inputText, setInputText] = useState("");
    const messagesEndRef = useRef(null);
    const [isTyping, setIsTyping] = useState(false);

    const commonQuestions = [
        "💰 Giá phòng thế nào?",
        "🔍 Kiểm tra đơn hàng",
        "🏨 Tiện nghi khách sạn",
        "📞 Liên hệ hỗ trợ"
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    // Reset chat when user changes (login/logout)
    useEffect(() => {
        setMessages([
            { id: 1, text: "Xin chào! Tôi có thể giúp gì cho bạn về việc đặt phòng khách sạn?", sender: 'bot', time: new Date() }
        ]);
        setIsOpen(false); // Optionally close the chat window
    }, [user]);

    const sendMessage = async (text) => {
        if (!text.trim()) return;

        const newUserMessage = {
            id: Date.now(),
            text: text,
            sender: 'user',
            time: new Date()
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInputText("");
        setIsTyping(true);

        // Special handling for Booking Code (starts with BK-)
        if (text.toUpperCase().trim().startsWith('BK-')) {
            try {
                const code = text.toUpperCase().trim();
                const { data } = await axios.post('/api/bookings/track', { code });
                
                let botText = "";
                if (data.success) {
                    const statusMap = {
                        'pending': 'Đang chờ xác nhận',
                        'confirmed': 'Đã xác nhận',
                        'cancelled': 'Đã hủy'
                    };
                    const status = statusMap[data.booking.status] || data.booking.status;
                    const isPaid = data.booking.isPaid ? "Đã thanh toán" : "Chưa thanh toán";
                    botText = `✅ Đơn hàng ${code} của bạn:\n- Trạng thái: ${status}\n- Khách sạn: ${data.booking.hotel.name}\n- Phòng: ${data.booking.room.roomType}\n- Check-in: ${new Date(data.booking.checkInDate).toLocaleDateString()}\n- Thanh toán: ${isPaid}`;
                } else {
                    botText = `❌ Rất tiếc, mình không tìm thấy đơn hàng nào có mã ${code}. Bạn vui lòng kiểm tra lại nhé!`;
                }

                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    text: botText,
                    sender: 'bot',
                    time: new Date()
                }]);
            } catch (error) {
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    text: "Xin lỗi, hiện tại mình không thể tra cứu thông tin. Bạn vui lòng thử lại sau.",
                    sender: 'bot',
                    time: new Date()
                }]);
            } finally {
                setIsTyping(false);
            }
            return;
        }

        // Standard Bot Response
        setTimeout(() => {
            const botResponse = getBotResponse(text);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: botResponse,
                sender: 'bot',
                time: new Date()
            }]);
            setIsTyping(false);
        }, 1500);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        sendMessage(inputText);
    };

    const getBotResponse = (text) => {
        const lowerText = text.toLowerCase();
        
        // Helper to check for keywords
        const contains = (keywords) => keywords.some(k => lowerText.includes(k));

        // 2. Pricing (Avoid confusion with 'đánh giá')
        if ((lowerText.includes('giá') && !lowerText.includes('đánh giá')) || lowerText.includes('bao nhiêu tiền') || lowerText.includes('chi phí')) {
            return "Giá phòng tại khách sạn chúng tôi rất linh hoạt, dao động từ 500k - 2tr VND/đêm tùy loại phòng. Bạn có thể nhấn vào 'Danh sách phòng' để xem chi tiết và ưu đãi hiện có.";
        }

        // 3. Reviews / Ratings
        if (contains(['đánh giá', 'review', 'nhận xét', 'tốt không'])) {
            return "Khách sạn chúng tôi tự hào nhận được nhiều đánh giá tích cực 5 sao từ khách hàng về sự sạch sẽ và phục vụ tận tình. Bạn có thể xem phần 'Đánh giá' ở trang chủ để an tâm hơn nhé!";
        }

        // 4. Booking Instructions
        if (contains(['đặt phòng', 'book', 'đặt sao', 'cách đặt'])) {
            return "Dạ đơn giản lắm ạ! Bạn chỉ cần:\n1. Chọn phòng ưng ý.\n2. Nhấn 'Chi tiết' -> 'Đặt ngay'.\n3. Điền thông tin và xác nhận.\nNếu gặp khó khăn, bạn cứ nhắn lại nhé!";
        }

        // 5. Contact Info
        if (contains(['liên hệ', 'sdt', 'số điện thoại', 'hotline', 'gọi', 'email', 'địa chỉ'])) {
            return "Hotline 24/7: 0912345678\nEmail: support@quickstayhotel.com\nĐịa chỉ: 331 Quốc Lộ 1A, An Phú Đông, TPHCM. Chúng tôi luôn sẵn sàng đón tiếp bạn!";
        }

        // 6. Amenities / Facilities
        if (contains(['tiện nghi', 'wifi', 'bể bơi', 'hồ bơi', 'ăn sáng', 'parking', 'đỗ xe'])) {
            return "Chúng tôi có đầy đủ tiện nghi: Wifi tốc độ cao miễn phí, bể bơi vô cực, bãi đỗ xe rộng rãi và bao gồm bữa sáng buffet hàng ngày cho mọi hạng phòng ạ.";
        }

        // 7. Check-in/out Rules
        if (contains(['check in', 'check out', 'nhận phòng', 'trả phòng', 'giờ'])) {
            return "Giờ nhận phòng (Check-in) là 14:00 và giờ trả phòng (Check-out) là 12:00 trưa. Nếu bạn cần nhận phòng sớm hoặc trả muộn, vui lòng liên hệ trước để chúng tôi sắp xếp.";
        }

        // 8. Consultation / General Help
        if (contains(['tư vấn', 'giúp', 'hỗ trợ', 'tìm phòng'])) {
            return "Dạ, bạn đang quan tâm đến phòng cho cặp đôi, gia đình hay đi công tác ạ? Hãy chia sẻ thêm để mình tư vấn loại phòng phù hợp nhất nhé!";
        }

        // 9. Thanks
        if (contains(['cảm ơn', 'thanks', 'ok', 'tuyệt'])) {
            return "Dạ không có chi ạ! Chúc bạn chọn được phòng ưng ý và có kỳ nghỉ thật tuyệt vời!";
        }

        // 10. Tracking Order
        if (contains(['tra cứu', 'kiểm tra', 'đơn hàng', 'booking', 'vé', 'status', 'tình trạng'])) {
            return "Để tra cứu trạng thái đơn hàng, bạn vui lòng nhập Mã đơn hàng (Ví dụ: BK-X1Y2Z3) vào ô chat nhé!";
        }

        // 1. Greetings (Moved to bottom to allow specific intents to match first)
        if (contains(['xin chào', 'hello', 'chào bạn']) || /\bhi\b/.test(lowerText) || /\bchào\b/.test(lowerText)) {
            return "Xin chào! Rất vui được hỗ trợ bạn. Bạn cần giúp đỡ về việc đặt phòng hay thông tin khách sạn ạ?";
        }

        // Default Fallback
        return "Xin lỗi, mình chưa hiểu rõ ý bạn lắm. Bạn có thể hỏi về 'giá phòng', 'tra cứu đơn hàng' hoặc để lại SĐT để nhân viên tư vấn ạ.";
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 bg-white w-80 sm:w-96 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 pointer-events-auto flex flex-col animate-fade-in-up origin-bottom-right transition-all duration-300" style={{maxHeight: '500px'}}>
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 text-white flex justify-between items-center shadow-md">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-white shadow-sm overflow-hidden p-1">
                                   <img src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png" alt="Support" className="w-full h-full object-cover" />
                                </div>
                                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full shadow-sm"></span>
                            </div>
                            <div>
                                <h3 className="font-bold text-base">Hỗ trợ trực tuyến</h3>
                                <p className="text-xs text-blue-100 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse"></span>
                                    Luôn sẵn sàng
                                </p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 p-4 overflow-y-auto bg-slate-50 h-[350px] flex flex-col gap-3">
                        {messages.map((msg) => (
                            <div 
                                key={msg.id} 
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {msg.sender === 'bot' && (
                                    <div className="w-8 h-8 rounded-full bg-white border border-gray-100 p-1 mr-2 self-end flex-shrink-0 shadow-sm">
                                         <img src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png" alt="Bot" className="w-full h-full object-contain" />
                                    </div>
                                )}
                                <div 
                                    className={`max-w-[75%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                                        msg.sender === 'user' 
                                            ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-none' 
                                            : 'bg-white text-slate-700 border border-gray-100 rounded-bl-none shadow-sm'
                                    }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start items-end">
                                <div className="w-8 h-8 rounded-full bg-white border border-gray-100 p-1 mr-2 mb-1 shadow-sm">
                                    <img src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png" alt="Bot" className="w-full h-full object-contain" />
                                </div>
                                <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-bl-none flex gap-1.5 items-center shadow-sm">
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Suggestions Area */}
                    <div className="px-5 py-2 bg-white border-t border-gray-100 flex gap-2 overflow-x-auto no-scrollbar">
                        {commonQuestions.map((q, idx) => (
                            <button
                                key={idx}
                                onClick={() => sendMessage(q)}
                                className="whitespace-nowrap px-3 py-1.5 bg-gray-100 hover:bg-blue-100 text-blue-600 text-xs rounded-full border border-gray-200 transition-colors"
                            >
                                {q}
                            </button>
                        ))}
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSendMessage} className="p-5 bg-white border-t border-gray-100 flex-none">
                        <div className="flex gap-2 items-center">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Bạn cần hỗ trợ gì..."
                                className="flex-1 px-4 py-2.5 bg-gray-100 border-transparent focus:bg-white border focus:border-blue-500 rounded-full focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all text-sm"
                            />
                            <button 
                                type="submit"
                                disabled={!inputText.trim()}
                                className="p-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center w-11 h-11"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-0.5">
                                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`pointer-events-auto relative p-0 w-16 h-16 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center group overflow-hidden ${
                    isOpen ? 'bg-white rotate-90 text-gray-500 hover:text-gray-700' : 'bg-gradient-to-tr from-blue-600 to-cyan-500 text-white'
                }`}
            >
                {/* Glow effect */}
                {!isOpen && (
                    <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-75"></div>
                )}
                
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <div className="relative z-10">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 animate-pulse-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        {/* Notification Dot */}
                        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-blue-500 animate-bounce"></span>
                    </div>
                )}
            </button>
        </div>
    );
};

export default ChatWidget;

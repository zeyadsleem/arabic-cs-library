---
title: "لعبة البوكر عبر البريد (Poker by Email)"
lang: ar
source: https://link.springer.com/book/10.1007/978-3-642-15328-0
---

# الفصل 18: لعبة البوكر عبر البريد (Poker by Email)

**Johannes Blömer**

جامعة بادربورن (Universität Paderborn)، بادربورن، ألمانيا

في هذا الفصل ندرس مشكلة مثيرة للاهتمام: كيف يمكن للاعبين توزيع أوراق لعب (playing cards) بينهم عبر البريد (email) (أو، كما في الفصول passés، عبر «البريد» (snail mail)) من دون أن needing a trusted third party. ستكون النتيجة خوارزمية (algorithm) لـ «لعبة البوكر عبر البريد» (poker by email). هذه الخوارزمية تستخدم التشفير بالمفتاح العام (public-key cryptography) (انظر الفصل 16) ونشر الأسرار (secret sharing) (انظر الفصل 17). سنرى كيف يمكن تطبيق هذه التقنيات (techniques) لحل مشكلة عملية: توزيع الأوراق (dealing cards) من دون كاشف (dealer).

## 18.1 مشكلة توزيع الأوراق

In many card games, like poker or bridge, the players have to be dealt cards. Usually, a trusted dealer distributes the cards. But what if no trusted dealer is available? For example, if you want to play poker with your friends over the Internet, you might not trust any of the players to deal the cards fairly. The problem is: how can the players distribute the cards among themselves without a trusted dealer?

## 18.2 تشفير لعب البوكر (Encrypting Poker)

The basic idea is to encrypt (encrypt) the cards. Each card is encrypted (encrypted) with a key (key) that is known only to one player. To deal a card, the card is encrypted (encrypted) by all players in turn. Then, to reveal a card, the card is decrypted (decrypted) by all players in turn.

## 18.3 خوارزمية لعبة البوكر عبر البريد (Poker by Email)

The algorithm works as follows. We have n players. The deck consists of 52 cards. Each player has a public key (public key) and a private key (private key). The algorithm has four phases:

1. **التشفير (Encryption):** Each player encrypts (encrypts) all 52 cards with her public key (public key). The result is a set of 52 encrypted cards (encrypted cards).
2. **الخلط (Shuffling):** The players take turns shuffling (shuffling) the encrypted deck (encrypted deck). Each player shuffles (shuffles) the deck and then passes it to the next player.
3. **التوزيع (Dealing):** Each player deals (deals) cards to the other players. To deal a card, the player sends the encrypted card (encrypted card) to the recipient.
4. **الكشف (Revealing):** To reveal a card, the card is decrypted (decrypted) by all players in turn. Each player removes her encryption (encryption) from the card.

## 18.4 تحليل (Analysis)

The algorithm is secure if no player can learn the value of a card that is not dealt to her. This requires that the encryption (encryption) is secure and that the shuffling (shuffling) is random.

## 18.5 الخلاصة (Summary)

In this chapter we have shown how to play poker by email (poker by email) without a trusted dealer (trusted dealer). The algorithm uses public-key cryptography (public-key cryptography) and secret sharing (secret sharing).

## قراءات إضافية (Further Reading)

1. Chapter 16 (Public-Key Cryptography)
2. Chapter 17 (How to Share a Secret)
3. http://en.wikipedia.org/wiki/Mental poker
   In this article you will find descriptions of mental poker (mental poker).

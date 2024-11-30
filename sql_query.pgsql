-- Завдання 6

-- Таблиця для каталогів 
CREATE TABLE IF NOT EXISTS public."Catalogs" (
    id SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    "catalogName" VARCHAR(255) NOT NULL,
    CONSTRAINT "Catalogs_userId_fkey" FOREIGN KEY ("userId")
        REFERENCES public."Users" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- Таблиця для розмов 
CREATE TABLE IF NOT EXISTS public."Conversations" (
    id SERIAL PRIMARY KEY,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Таблиця для учасників розмови 
CREATE TABLE IF NOT EXISTS public."ConversationParticipants" (
    id SERIAL PRIMARY KEY,
    "conversationId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "isBlacklisted" BOOLEAN DEFAULT FALSE,
    "isFavorited" BOOLEAN DEFAULT FALSE,
    CONSTRAINT "ConversationParticipants_conversationId_fkey" FOREIGN KEY ("conversationId")
        REFERENCES public."Conversations" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT "ConversationParticipants_userId_fkey" FOREIGN KEY ("userId")
        REFERENCES public."Users" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- Таблиця для повідомлень
CREATE TABLE IF NOT EXISTS public."Messages" (
    id SERIAL PRIMARY KEY,
    sender INTEGER NOT NULL,
    body TEXT NOT NULL,
    "conversationId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Messages_conversationId_fkey" FOREIGN KEY ("conversationId")
        REFERENCES public."Conversations" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT "Messages_sender_fkey" FOREIGN KEY (sender)
        REFERENCES public."Users" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

DROP TABLE IF EXISTS public."Messages" CASCADE;
DROP TABLE IF EXISTS public."Conversations" CASCADE;
DROP TABLE IF EXISTS public."ConversationParticipants" CASCADE;
DROP TABLE IF EXISTS public."Catalogs" CASCADE;

-- Завдання 7 
-- Вивести кількість юзерів за ролями {admin: 40, customer: 22, ...}
SELECT role, COUNT(*) AS user_count
FROM public."Users"
GROUP BY role;

--Завдання 8 
-- Усім юзерам з роллю customer, які здійснювали замовлення в 
-- новорічні свята в період з 25.12 по 14.01 (беремо до уваги два роки найближчі до вказаних дат), необхідно зарахувати 
-- по 10% кешбеку з усіх замовлень у цей період.
WITH holiday_orders AS (SELECT c."userId", SUM(c.prize) * 0.1 AS cashback
FROM public."Contests" c
JOIN public."Users" u ON u.id = c."userId"
WHERE u.role = 'customer' AND (
    (c."createdAt"::date BETWEEN '2022-12-25' AND '2022-12-31') OR
    (c."createdAt"::date BETWEEN '2023-01-01' AND '2023-01-14') OR
    (c."createdAt"::date BETWEEN '2023-12-25' AND '2023-12-31') OR
    (c."createdAt"::date BETWEEN '2024-01-01' AND '2024-01-14')
)
GROUP BY c."userId" )
UPDATE public."Users" u
SET balance = u.balance + ho.cashback
FROM holiday_orders ho
WHERE u.id = ho."userId";
